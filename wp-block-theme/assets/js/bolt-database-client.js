// Bolt Database client (kebab-case filename)
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const url = (window.OLON_CONFIG && (window.OLON_CONFIG['Bolt DatabaseUrl'] || window.OLON_CONFIG.BoltDatabaseUrl)) || '';
const key = (window.OLON_CONFIG && (window.OLON_CONFIG['Bolt DatabaseAnonKey'] || window.OLON_CONFIG.BoltDatabaseAnonKey)) || '';

export const Bolt = createClient(url, key);
export default Bolt;
