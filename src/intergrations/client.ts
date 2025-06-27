import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://oobqtzmswaecmbqldsax.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vYnF0em1zd2FlY21icWxkc2F4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3MDM4NjAsImV4cCI6MjA2NjI3OTg2MH0.KzXM5-itGdZ5rvamjpn54cJrwMSrzoP02a-dcrXlSOE";


export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);