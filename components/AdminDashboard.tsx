import React, { useState, useEffect } from 'react';
import { supabase, supabaseUrl } from '../lib/supabase';
import {
  LogOut, 
  Save, 
  X,
  Loader2,
  Lock,
  Plus,
  Edit2,
  Trash2
} from 'lucide-react';

type Tab = 'testimonials' | 'media_items' | 'faqs';

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
    // Determine ordering based on table schema
    const orderBy = activeTab === 'faqs' ? 'display_order' : 'created_at';
    
    const { data, error } = await supabase
      .from(activeTab)
      .select('*')
      .order(orderBy, { ascending: activeTab === 'faqs' });
    
    if (error) {
      setError(`Failed to load ${activeTab}: ${error.message}`);
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
    setLoading(true);
    setError(null);
    
    const { data: { session: currentSession } } = await supabase.auth.getSession();
    
    if (!currentSession) {
      throw new Error('Authentication session expired. Please log in again.');
    }

    try {
      const response = await fetch(`${supabaseUrl}/functions/v1/manage-content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentSession?.access_token}`,
          'apikey': 'sb_publishable_aK2eimbeZ1uj9uURrPiasA_2LhFOrE-',
        },
        body: JSON.stringify({
          action,
          table: activeTab,
          payload,
          id
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || `Function Error: ${response.status}`);
      }

      await fetchData();
      setIsModalOpen(false);
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await callEdgeFunction('update', formData, editingItem.id);
      } else {
        await callEdgeFunction('create', formData);
      }
      setEditingItem(null);
      setFormData({});
    } catch (err) {}
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      await callEdgeFunction('delete', {}, id);
    } catch (err) {}
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
            <Lock className="text-red-600 w-12 h-12 mb-4" />
            <h1 className="text-3xl font-serif font-bold text-white">Admin Login</h1>
          </div>
          <form onSubmit={handleAuth} className="space-y-6">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none"
              placeholder="Email"
              required
            />
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none"
              placeholder="Password"
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg disabled:opacity-50">
              {authLoading ? <Loader2 className="animate-spin mx-auto" /> : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-serif font-bold text-red-600">BPC Admin</h2>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          {[
            { id: 'testimonials', label: 'Testimonials' },
            { id: 'media_items', label: 'Media Library' },
            { id: 'faqs', label: 'FAQs' }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === tab.id ? 'bg-red-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-500 transition-all">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 flex justify-between">
            <p>{error}</p>
            <button onClick={() => setError(null)}><X size={16} /></button>
          </div>
        )}
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-white capitalize">{activeTab.replace('_', ' ')}</h1>
          <button onClick={() => openModal()} className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-red-600/20">
            <Plus size={20} className="inline mr-2" /> Add New
          </button>
        </div>

        {/* Data Grid */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-800/50 border-b border-slate-800">
                <th className="px-6 py-4 text-sm font-semibold text-slate-300">Content</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-300">Primary Info</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-300 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {loading && !isModalOpen ? (
                <tr><td colSpan={3} className="px-6 py-12 text-center"><Loader2 className="animate-spin mx-auto text-red-600" /></td></tr>
              ) : items.length === 0 ? (
                <tr><td colSpan={3} className="px-6 py-12 text-center text-slate-500">No items found.</td></tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/30 transition-all">
                    <td className="px-6 py-4 font-medium text-white">{item.name || item.title || item.question}</td>
                    <td className="px-6 py-4 text-slate-400 truncate max-w-xs">{item.role || item.type || item.answer}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openModal(item)} className="p-2 text-slate-400 hover:text-yellow-400 transition-colors"><Edit2 size={18} /></button>
                        <button onClick={() => handleDelete(item.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CRUD Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <h2 className="text-2xl font-serif font-bold text-white">{editingItem ? 'Edit' : 'Add'} {activeTab.replace('_', ' ')}</h2>
              <button onClick={() => setIsModalOpen(false)}><X size={24} className="text-slate-400 hover:text-white" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto custom-scrollbar">
              {activeTab === 'testimonials' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <input className="w-full bg-slate-800 p-3 rounded-lg text-white" placeholder="Name" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} required />
                    <input className="w-full bg-slate-800 p-3 rounded-lg text-white" placeholder="Role" value={formData.role || ''} onChange={e => setFormData({...formData, role: e.target.value})} required />
                  </div>
                  <input className="w-full bg-slate-800 p-3 rounded-lg text-white" placeholder="Excerpt (Short summary)" value={formData.excerpt || ''} onChange={e => setFormData({...formData, excerpt: e.target.value})} required />
                  <textarea className="w-full bg-slate-800 p-3 rounded-lg text-white h-32" placeholder="Full Testimonial Text" value={formData.full_text || ''} onChange={e => setFormData({...formData, full_text: e.target.value})} required />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="number" min="1" max="5" className="w-full bg-slate-800 p-3 rounded-lg text-white" placeholder="Rating (1-5)" value={formData.rating || ''} onChange={e => setFormData({...formData, rating: parseInt(e.target.value)})} required />
                    <input className="w-full bg-slate-800 p-3 rounded-lg text-white" placeholder="Date (e.g. Jan 15, 2026)" value={formData.date || ''} onChange={e => setFormData({...formData, date: e.target.value})} required />
                  </div>
                </>
              )}
              {activeTab === 'media_items' && (
                <>
                  <input className="w-full bg-slate-800 p-3 rounded-lg text-white" placeholder="Title" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} required />
                  <div className="grid grid-cols-2 gap-4">
                    <select className="w-full bg-slate-800 p-3 rounded-lg text-white" value={formData.type || ''} onChange={e => setFormData({...formData, type: e.target.value})} required>
                        <option value="" disabled>Select Type</option>
                        <option value="video">Video</option>
                        <option value="image">Image / Article</option>
                    </select>
                    <input className="w-full bg-slate-800 p-3 rounded-lg text-white" placeholder="Duration (e.g. 14:20)" value={formData.duration || ''} onChange={e => setFormData({...formData, duration: e.target.value})} required />
                  </div>
                  <input className="w-full bg-slate-800 p-3 rounded-lg text-white" placeholder="Thumbnail URL (Unsplash/Imgur)" value={formData.thumbnail || ''} onChange={e => setFormData({...formData, thumbnail: e.target.value})} required />
                  <input className="w-full bg-slate-800 p-3 rounded-lg text-white" placeholder="Views (e.g. 1.2k)" value={formData.views || ''} onChange={e => setFormData({...formData, views: e.target.value})} />
                </>
              )}
              {activeTab === 'faqs' && (
                <>
                  <input className="w-full bg-slate-800 p-3 rounded-lg text-white" placeholder="Question" value={formData.question || ''} onChange={e => setFormData({...formData, question: e.target.value})} required />
                  <textarea className="w-full bg-slate-800 p-3 rounded-lg text-white h-32" placeholder="Answer" value={formData.answer || ''} onChange={e => setFormData({...formData, answer: e.target.value})} required />
                  <input type="number" className="w-full bg-slate-800 p-3 rounded-lg text-white" placeholder="Display Order (Lower numbers show first)" value={formData.display_order || ''} onChange={e => setFormData({...formData, display_order: parseInt(e.target.value)})} />
                </>
              )}
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-slate-800 py-3 rounded-xl transition-colors hover:bg-slate-700">Cancel</button>
                <button type="submit" disabled={loading} className="flex-1 bg-red-600 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:bg-red-700 disabled:opacity-50">
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