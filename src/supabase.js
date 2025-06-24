import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cmgseokmesrlbypuqicn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtZ3Nlb2ttZXNybGJ5cHVxaWNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0NjQ3NjIsImV4cCI6MjA2MjA0MDc2Mn0.7E-G7_mGCyEZEvjaaM31Vhf3AhRlu1PCQqZ2cF0oiIQ'

export const supabase = createClient(supabaseUrl, supabaseKey)
