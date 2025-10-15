// Minimal Bolt Database client wrapper for the theme
// This file expects OLON_CONFIG to be provided by PHP via wp_localize_script
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const BoltDatabaseUrl = (window.OLON_CONFIG && window.OLON_CONFIG.BoltDatabaseUrl) || '';
const BoltDatabaseAnonKey = (window.OLON_CONFIG && window.OLON_CONFIG.BoltDatabaseAnonKey) || '';

export const Bolt = createClient(BoltDatabaseUrl, BoltDatabaseAnonKey);

export default Bolt;
