#!/usr/bin/env node
/* test-bolt-connection.mjs
   Simple smoke-test script to verify Bolt Database connectivity.
   Usage: VITE_BOLT_DATABASE_URL=... VITE_BOLT_DATABASE_ANON_KEY=... node tools/test-bolt-connection.mjs
*/
import fetch from 'node-fetch';
import { createClient } from '@supabase/supabase-js';

const url = process.env.VITE_BOLT_DATABASE_URL || process.env.VITE_BoltDatabase_URL || process.env.BOLT_DATABASE_URL;
const key = process.env.VITE_BOLT_DATABASE_ANON_KEY || process.env.VITE_BoltDatabase_ANON_KEY || process.env.BOLT_DATABASE_ANON_KEY;

if (!url || !key) {
  console.error('Missing env variables VITE_BOLT_DATABASE_URL and VITE_BOLT_DATABASE_ANON_KEY');
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
