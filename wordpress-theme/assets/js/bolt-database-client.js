// Bolt Database client (kebab-case filename)
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// Use canonical env names via import.meta.env as requested by BOLTAI
const BoltDatabaseUrl = (import.meta.env && import.meta.env['VITE_Bolt Database_URL']) || (window.OLON_CONFIG && window.OLON_CONFIG['VITE_Bolt Database_URL']) || '';
const BoltDatabaseAnonKey = (import.meta.env && import.meta.env['VITE_Bolt Database_ANON_KEY']) || (window.OLON_CONFIG && window.OLON_CONFIG['VITE_Bolt Database_ANON_KEY']) || '';

const url = BoltDatabaseUrl;
const key = BoltDatabaseAnonKey;

export const Bolt = createClient(url, key);
export default Bolt;
