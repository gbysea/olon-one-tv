// Bolt Database client (kebab-case filename)
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// Prefer localized 'Bolt Database' PHP constant values if available (OLON_CONFIG), then Vite no-space vars.
const BoltDatabaseUrl = (window.OLON_CONFIG && (window.OLON_CONFIG['Bolt Database_URL'] || window.OLON_CONFIG['VITE_BoltDatabase_URL'])) || (import.meta.env && import.meta.env['VITE_BoltDatabase_URL']) || '';
const BoltDatabaseAnonKey = (window.OLON_CONFIG && (window.OLON_CONFIG['Bolt Database_ANON_KEY'] || window.OLON_CONFIG['VITE_BoltDatabase_ANON_KEY'])) || (import.meta.env && import.meta.env['VITE_BoltDatabase_ANON_KEY']) || '';

const url = BoltDatabaseUrl;
const key = BoltDatabaseAnonKey;

export const Bolt = createClient(url, key);
export default Bolt;
