// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qfhhsthxpemcsdftzlit.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmaGhzdGh4cGVtY3NkZnR6bGl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4NzEzNjYsImV4cCI6MjA4MTQ0NzM2Nn0.Oe2A9he0NOejuJju709MLvAEjbpQDjR0DOS3AFEJrhA'

export const supabase = createClient(supabaseUrl, supabaseKey)