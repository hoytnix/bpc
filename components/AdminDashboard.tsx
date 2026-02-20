import React, { useState, useEffect } from 'react';
import { supabase, supabaseUrl, supabaseAnonKey } from '../lib/supabase';
import { 
  LayoutDashboard, 
  MessageSquare, 
  PlayCircle, 
  HelpCircle, 
  Plus, 
  Edit2, 
  Trash2, 
  LogOut, 
  Save, 
  X,
  Loader2,
  Lock
} from 'lucide-react';

type Tab = 'testimonials' | 'media_items' | 'faqs';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  excerpt: string;
  fullText: string;
  rating: number;
}

interface MediaItem {
  id: string;
  title: string;
  type: string;
  thumbnail: string;
  duration: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const AdminDashboard: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<Tab>('testimonials');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      fetchData();
    }
  }, [session, activeTab]);

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from(activeTab)
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error(`[Admin] Error fetching ${activeTab}:`, error);
      setError(`Failed to load ${activeTab}: ${error.message}. Check if the table exists and RLS policies allow reading.`);
    } else {
      setItems(data || []);
      setError(null);
    }
    setLoading(false);
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setAuthLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const callEdgeFunction = async (action: 'create' | 'update' | 'delete', payload: any = {}, id?: string) => {
    // Calling getUser() forces a server-side check of the token, ensuring it's valid and refreshing it if needed.
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      console.error('[Edge Function] User validation failed:', userError);
      throw new Error('Authentication session expired or invalid. Please log out and log back in.');
    }

    // Get the session to access the access_token
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
      try {
        const payload = JSON.parse(atob(session.access_token.split('.')[1]));
        const exp = new Date(payload.exp * 1000);
        console.log(`[Edge Function] Token Expiry: ${exp.toLocaleString()}`, {
          isExpired: exp < new Date(),
          role: payload.role
        });
      } catch (e) {
        console.error('[Edge Function] Could not parse token payload', e);
      }
    }

    console.log(`[Edge Function] Calling ${action} on ${activeTab}...`, { 
      payload, 
      id,
      userId: user.id
    });

    let response;
    try {
      response = await fetch(`${supabaseUrl}/functions/v1/manage-content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': `Bearer ${session?.access_token}`,
          'apikey': supabaseAnonKey,
        },
        body: JSON.stringify({
          action,
          table: activeTab,
          payload,
          id
        }),
      });
    } catch (fetchErr: any) {
      console.group('--- Network Error Calling Edge Function ---');
      console.error('Fetch Error:', fetchErr);
      console.error('Target URL:', `${supabaseUrl}/functions/v1/manage-content`);
      console.groupEnd();

      let detailedMsg = `Network Error: Could not reach the management service. `;
      if (fetchErr.message === 'Failed to fetch') {
        detailedMsg += "This usually means a CORS issue, an ad-blocker interference, or the Edge Function is not deployed/active. Check your browser console for 'Access-Control-Allow-Origin' errors.";
      } else {
        detailedMsg += fetchErr.message;
      }
      throw new Error(detailedMsg);
    }

    if (!response.ok) {
      const bodyText = await response.text();
      let errorMessage = `Function Error: ${response.status}`;
      
      try {
        const errorData = JSON.parse(bodyText);
        console.group('--- Edge Function Error Details ---');
        console.error('Error Data:', errorData);
        console.groupEnd();

        // Handle different error formats (Supabase Gateway vs Custom)
        errorMessage = errorData.error || errorData.message || errorData.msg || errorMessage;
        
        if (errorData.details) errorMessage += ` (${errorData.details})`;
        if (errorData.hint) errorMessage += ` Hint: ${errorData.hint}`;
        if (errorData.requestId) errorMessage += ` [Ref: ${errorData.requestId}]`;
      } catch (e) {
        console.error('Raw Response Body:', bodyText);
        if (bodyText.includes('Invalid JWT') || bodyText.includes('Missing authorization header')) {
          errorMessage = 'Your login session has expired or is invalid. Please log out and log back in.';
        } else {
          errorMessage += ` | Body: ${bodyText}`;
        }
      }
      
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log(`[Edge Function] ${action} success:`, data);
    return data;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingItem) {
        await callEdgeFunction('update', formData, editingItem.id);
      } else {
        await callEdgeFunction('create', formData);
      }
      setIsModalOpen(false);
      setEditingItem(null);
      setFormData({});
      setError(null);
      fetchData();
    } catch (err: any) {
      console.error('[Admin] Save error:', err);
      setError(err.message || 'An unexpected error occurred while saving.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    setLoading(true);
    try {
      await callEdgeFunction('delete', {}, id);
      setError(null);
      fetchData();
    } catch (err: any) {
      console.error('[Admin] Delete error:', err);
      setError(err.message || 'An unexpected error occurred while deleting.');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (item: any = null) => {
    setEditingItem(item);
    setFormData(item || {});
    setIsModalOpen(true);
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="text-red-600 w-8 h-8" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-white">Admin Login</h1>
            <p className="text-slate-400 text-sm mt-2">BPC Performance Management</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
                placeholder="admin@burnsperformance.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button 
              type="submit" 
              disabled={authLoading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {authLoading ? <Loader2 className="animate-spin" /> : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Sidebar Navigation */}
      <div className="fixed left-0 top-0 h-full w-64 bg-slate-900 border-r border-slate-800 hidden lg:flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-serif font-bold text-red-600">BPC Admin</h2>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('testimonials')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'testimonials' ? 'bg-red-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <MessageSquare size={20} /> Testimonials
          </button>
          <button 
            onClick={() => setActiveTab('media_items')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'media_items' ? 'bg-red-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <PlayCircle size={20} /> Media Library
          </button>
          <button 
            onClick={() => setActiveTab('faqs')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'faqs' ? 'bg-red-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <HelpCircle size={20} /> FAQs
          </button>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 p-8">
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500 animate-in fade-in slide-in-from-top-2">
            <X size={20} className="shrink-0" />
            <p className="text-sm font-medium">{error}</p>
            <button onClick={() => setError(null)} className="ml-auto hover:text-white">
              <X size={16} />
            </button>
          </div>
        )}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-serif font-bold text-white capitalize">{activeTab.replace('_', ' ')}</h1>
            <p className="text-slate-400 mt-1">Manage your website content efficiently.</p>
          </div>
          <button 
            onClick={() => openModal()}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-red-600/20 transition-all"
          >
            <Plus size={20} /> Add New
          </button>
        </div>

        {/* Data Grid */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-800/50 border-b border-slate-800">
                  <th className="px-6 py-4 text-sm font-semibold text-slate-300">
                    {activeTab === 'testimonials' ? 'Name' : activeTab === 'media_items' ? 'Title' : 'Question'}
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-300">
                    {activeTab === 'testimonials' ? 'Role' : activeTab === 'media_items' ? 'Type' : 'Answer Preview'}
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-300 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {loading ? (
                  Array(5).fill(0).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-6 py-4"><div className="h-4 bg-slate-800 rounded w-3/4"></div></td>
                      <td className="px-6 py-4"><div className="h-4 bg-slate-800 rounded w-1/2"></div></td>
                      <td className="px-6 py-4"><div className="h-4 bg-slate-800 rounded w-1/4 ml-auto"></div></td>
                    </tr>
                  ))
                ) : items.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-12 text-center text-slate-500">No items found.</td>
                  </tr>
                ) : (
                  items.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/30 transition-all group">
                      <td className="px-6 py-4 font-medium text-white">
                        {item.name || item.title || item.question}
                      </td>
                      <td className="px-6 py-4 text-slate-400 truncate max-w-xs">
                        {item.role || item.type || item.answer}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => openModal(item)}
                            className="p-2 text-slate-400 hover:text-yellow-400 hover:bg-yellow-400/10 rounded-lg transition-all"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* CRUD Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <h2 className="text-2xl font-serif font-bold text-white">
                {editingItem ? 'Edit' : 'Add'} {activeTab.replace('_', ' ')}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white transition-all">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-4">
              {activeTab === 'testimonials' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">Name</label>
                      <input 
                        type="text" 
                        value={formData.name || ''} 
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-red-600 outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">Role/Company</label>
                      <input 
                        type="text" 
                        value={formData.role || ''} 
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-red-600 outline-none"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Rating (1-5)</label>
                    <input 
                      type="number" 
                      min="1" max="5"
                      value={formData.rating || 5} 
                      onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-red-600 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Excerpt (Short Preview)</label>
                    <textarea 
                      value={formData.excerpt || ''} 
                      onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-red-600 outline-none h-20"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Full Testimonial</label>
                    <textarea 
                      value={formData.fullText || ''} 
                      onChange={(e) => setFormData({...formData, fullText: e.target.value})}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-red-600 outline-none h-32"
                      required
                    />
                  </div>
                </>
              )}

              {activeTab === 'media_items' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Title</label>
                    <input 
                      type="text" 
                      value={formData.title || ''} 
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-red-600 outline-none"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">Type (e.g. Video, Podcast)</label>
                      <input 
                        type="text" 
                        value={formData.type || ''} 
                        onChange={(e) => setFormData({...formData, type: e.target.value})}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-red-600 outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">Duration</label>
                      <input 
                        type="text" 
                        value={formData.duration || ''} 
                        onChange={(e) => setFormData({...formData, duration: e.target.value})}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-red-600 outline-none"
                        placeholder="12:45"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Thumbnail URL</label>
                    <input 
                      type="url" 
                      value={formData.thumbnail || ''} 
                      onChange={(e) => setFormData({...formData, thumbnail: e.target.value})}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-red-600 outline-none"
                      placeholder="https://picsum.photos/..."
                      required
                    />
                  </div>
                </>
              )}

              {activeTab === 'faqs' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Question</label>
                    <input 
                      type="text" 
                      value={formData.question || ''} 
                      onChange={(e) => setFormData({...formData, question: e.target.value})}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-red-600 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Answer</label>
                    <textarea 
                      value={formData.answer || ''} 
                      onChange={(e) => setFormData({...formData, answer: e.target.value})}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-red-600 outline-none h-40"
                      required
                    />
                  </div>
                </>
              )}

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <><Save size={20} /> Save Changes</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
