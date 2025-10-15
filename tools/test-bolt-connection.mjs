#!/usr/bin/env node
/* test-bolt-connection.mjs
   Simple smoke-test script to verify Bolt Database connectivity.
   Usage: VITE_BOLT_DATABASE_URL=... VITE_BOLT_DATABASE_ANON_KEY=... node tools/test-bolt-connection.mjs
*/
import fetch from 'node-fetch';
import { createClient } from '@supabase/supabase-js';

// Accept either a JSON config pointed to by TEST_BOLT_CONFIG, or env vars (no-space Option A),
// or a small PHP-exports file (optional) that exports constants for local CI.
import fs from 'fs';

let url = process.env.VITE_BoltDatabase_URL || '';
let key = process.env.VITE_BoltDatabase_ANON_KEY || '';

// If TEST_BOLT_CONFIG is provided, it should be a JSON file with { "url": "...", "key": "..." }
if ( process.env.TEST_BOLT_CONFIG ) {
  try {
    const cfg = JSON.parse(fs.readFileSync(process.env.TEST_BOLT_CONFIG, 'utf8'));
    url = url || cfg.url || '';
    key = key || cfg.key || '';
  } catch (e) {
    console.error('Failed to read TEST_BOLT_CONFIG', e.message || e);
  }
}

if (!url || !key) {
  console.error('Missing Bolt Database credentials. Set TEST_BOLT_CONFIG or VITE_BoltDatabase_URL and VITE_BoltDatabase_ANON_KEY');
  process.exit(1);
}

const client = createClient(url, key);

async function test() {
  try {
    console.log('Fetching categories...');
    const { data: categories, error: cErr } = await client.from('categories').select('*').limit(10);
    if (cErr) console.error('Categories error:', cErr);
    else console.log('Categories count:', categories.length);

    console.log('Fetching posts...');
    const { data: posts, error: pErr } = await client.from('posts').select('id,title,slug').limit(5);
    if (pErr) console.error('Posts error:', pErr);
    else console.log('Posts count:', posts.length);
  } catch (e) {
    console.error('Connection error', e.message || e);
  }
}

test();
