// src/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jeqhxxmcawlzzuyuauwv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplcWh4eG1jYXdsenp1eXVhdXd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5NjcxNTYsImV4cCI6MjA2NDU0MzE1Nn0.0NVnDZllr2tYctTycr6gr47dAD2e75f3Ks-Bdn0uUK4'

export const supabase = createClient(supabaseUrl, supabaseKey);