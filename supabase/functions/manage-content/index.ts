import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // 1. Auth Verification
    const authHeader = req.headers.get('Authorization') || req.headers.get('authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'BPC_FUNCTION_ERROR: Missing Authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')
    const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceRoleKey) {
      return new Response(
        JSON.stringify({ 
          error: 'Edge Function configuration error', 
          details: 'Missing SUPABASE_URL, SUPABASE_ANON_KEY, or SUPABASE_SERVICE_ROLE_KEY in Supabase project settings.' 
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Initialize Supabase client using URL and Anon Key
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    const token = authHeader.replace('Bearer ', '')
    
    // Retrieve the user
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized', details: authError?.message }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Strict Admin Check: Only Tommy's email is allowed
    const ADMIN_EMAIL = 'burnsperformanceconsulting@gmail.com'
    if (user.email !== ADMIN_EMAIL) {
      return new Response(
        JSON.stringify({ error: 'Forbidden: You do not have admin privileges' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // 2. Parse JSON Body
    const { action, table, payload, id } = await req.json()

    const allowedTables = ['testimonials', 'media_items', 'faqs']
    if (!table || !allowedTables.includes(table)) {
      return new Response(
        JSON.stringify({ error: `Invalid table. Allowed: ${allowedTables.join(', ')}` }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // 3. Initialize Admin Client
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey)

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
      return new Response(
        JSON.stringify({ error: dbError.message, code: dbError.code }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify(result),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message || 'Internal Server Error' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
