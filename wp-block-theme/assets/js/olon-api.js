// Wrapper that exposes window.olonDB API using the Bolt client module.
let BoltClient = null;

async function loadBoltModule() {
  if (BoltClient) return BoltClient;
  // Import the canonical bolt-database-client.js (kebab-case filename) to avoid
  // issues with spaces in filenames and tooling. The client will read OLON_CONFIG.
  try {
    const m = await import('./bolt-database-client.js');
    BoltClient = m.default || m.Bolt || null;
  } catch (e) {
    console.error('Failed to load canonical bolt-database-client.js', e);
    BoltClient = null;
  }
  return BoltClient;
}

async function initBoltDatabase() {
  const Bolt = await loadBoltModule();
  if (!Bolt) return null;
  // Bolt is a supabase client instance already created with OLON_CONFIG by the module
  window.olonDB = window.olonDB || {};
  window.olonDB._client = Bolt;
  // Provide convenience methods
  window.olonDB.getCategories = async function() {
    const { data, error } = await Bolt.from('categories').select('*').order('sort_order', { ascending: true });
    if (error) { console.error(error); return []; }
    return data;
  };
  window.olonDB.getCategoryBySlug = async function(slug) {
    const { data, error } = await Bolt.from('categories').select('*').eq('slug', slug).maybeSingle();
    if (error) { console.error(error); return null; }
    return data;
  };
  window.olonDB.getPosts = async function(limit = null) {
    let q = Bolt.from('posts').select('*, categories (id,name,slug,icon_up,icon_hover)').eq('published', true).order('created_at', { ascending: false });
    if (limit) q = q.limit(limit);
    const { data, error } = await q;
    if (error) { console.error(error); return []; }
    return data;
  };
  window.olonDB.getPostsByCategory = async function(categorySlug) {
    const { data, error } = await Bolt.from('posts').select('*, categories!inner (id,name,slug,icon_up,icon_hover)').eq('categories.slug', categorySlug).eq('published', true).order('created_at', { ascending: false });
    if (error) { console.error(error); return []; }
    return data;
  };
  window.olonDB.getPostBySlug = async function(slug) {
    const { data, error } = await Bolt.from('posts').select('*, categories (id,name,slug,icon_up,icon_hover)').eq('slug', slug).maybeSingle();
    if (error) { console.error(error); return null; }
    return data;
  };
  window.olonDB.recordVote = async function(postId, voteType, userIdentifier){
    const { data, error } = await Bolt.from('user_post_votes').insert({ post_id: postId, vote_type: voteType, user_identifier: userIdentifier });
    return { data, error };
  };

  return window.olonDB;
}

// expose init function
export { initBoltDatabase };
export default { initBoltDatabase };
