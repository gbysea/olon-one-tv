// Bolt Database client wrapper for the theme (filename intentionally contains a space)
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const url = (window.OLON_CONFIG && window.OLON_CONFIG['Bolt DatabaseUrl']) || '';
const key = (window.OLON_CONFIG && window.OLON_CONFIG['Bolt DatabaseAnonKey']) || '';

export const Bolt = createClient(url, key);
export default Bolt;
