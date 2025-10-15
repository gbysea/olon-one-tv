// Bolt Database client (kebab-case filename)
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// Use Option A canonical env names (no spaces)
const BoltDatabaseUrl = (import.meta.env && import.meta.env['VITE_BoltDatabase_URL']) || (window.OLON_CONFIG && window.OLON_CONFIG['VITE_BoltDatabase_URL']) || '';
const BoltDatabaseAnonKey = (import.meta.env && import.meta.env['VITE_BoltDatabase_ANON_KEY']) || (window.OLON_CONFIG && window.OLON_CONFIG['VITE_BoltDatabase_ANON_KEY']) || '';

const url = BoltDatabaseUrl;
const key = BoltDatabaseAnonKey;

export const Bolt = createClient(url, key);
export default Bolt;
