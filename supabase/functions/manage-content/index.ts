import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req) => {
  const requestId = Math.random().toString(36).substring(7);
  console.log(`[${requestId}] Request received: ${req.method}`);
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseAnonKey = Deno.env.get('PUBLISHABLE_KEY')
    const supabaseServiceRoleKey = Deno.env.get('SECRET_KEY')

    if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceRoleKey) {
      console.error(`[${requestId}] Missing environment variables`);
      return new Response(
        JSON.stringify({ 
          error: 'Edge Function configuration error', 
          details: 'Missing SUPABASE_URL, SUPABASE_ANON_KEY/PUBLISHABLE_KEY, or SUPABASE_SERVICE_ROLE_KEY/SECRET_KEY in Supabase project settings.' 
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // 1. Auth Verification - Use Admin client to verify the JWT directly
    const token = authHeader.replace('Bearer ', '')
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      }
    })
    
    // verify the JWT and get the user
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token)

    if (authError || !user) {
      console.error(`[${requestId}] Auth error:`, authError?.message || 'No user found');
      return new Response(
        JSON.stringify({ 
          error: 'Authentication Failed', 
          details: authError?.message || 'The provided token is invalid or expired.',
          token_preview: `${token.substring(0, 10)}...${token.substring(token.length - 10)}`,
          requestId
        }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log(`[${requestId}] Authenticated user: ${user.email}`);

    // 2. Parse JSON Body
    const body = await req.json()
    const { action, table, payload, id } = body
    console.log(`[${requestId}] Action: ${action}, Table: ${table}, ID: ${id}`);

    const allowedTables = ['testimonials', 'media_items', 'faqs']
    if (!table || !allowedTables.includes(table)) {
      return new Response(
        JSON.stringify({ error: `Invalid table. Allowed: ${allowedTables.join(', ')}` }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // 3. Execute corresponding query using the already initialized Admin Client
    let result
    let dbError

    // 4. Execute corresponding query
    switch (action) {
      case 'create':
        {
          const { data, error } = await supabaseAdmin
            .from(table)
            .insert(payload)
            .select()
            .single()
          result = data
          dbError = error
        }
        break

      case 'update':
        {
          if (!id) throw new Error('ID is required for update action')
          const { data, error } = await supabaseAdmin
            .from(table)
            .update(payload)
            .eq('id', id)
            .select()
            .single()
          result = data
          dbError = error
        }
        break

      case 'delete':
        {
          if (!id) throw new Error('ID is required for delete action')
          const { error } = await supabaseAdmin
            .from(table)
            .delete()
            .eq('id', id)
          
          if (!error) {
            result = { success: true, message: `Record ${id} deleted from ${table}` }
          }
          dbError = error
        }
        break

      default:
        return new Response(
          JSON.stringify({ error: 'Invalid action. Allowed: create, update, delete' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }

    if (dbError) {
      console.error(`[${requestId}] Database error:`, dbError);
      return new Response(
        JSON.stringify({ 
          error: `Database ${action} failed on ${table}.`, 
          details: dbError.message, 
          code: dbError.code,
          hint: 'Check if the payload matches the table schema and RLS policies allow this action.'
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify(result),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (err: any) {
    console.error(`[${requestId}] Unexpected error:`, err);
    return new Response(
      JSON.stringify({ 
        error: 'The management service encountered an unexpected error.', 
        details: err.message || 'Unknown error',
        requestId 
      }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
