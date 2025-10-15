// Read config from OLON_CONFIG (in WP) or environment (Vite/import.meta.env) or window VITE vars.
// IMPORTANT: Do NOT hardcode real credentials here. Use wp_localize_script or wp-config.php in production.
const __OLON_CFG = (typeof OLON_CONFIG !== 'undefined') ? OLON_CONFIG : (window.OLON_CONFIG || {});

// Prefer OLON_CONFIG keys (supports both spaced and unspaced variants for compatibility)
const BoltDatabase_URL = __OLON_CFG['Bolt DatabaseUrl'] || __OLON_CFG.BoltDatabaseUrl || __OLON_CFG['BoltDatabaseUrl'] || '';
const BoltDatabase_ANON_KEY = __OLON_CFG['Bolt DatabaseAnonKey'] || __OLON_CFG.BoltDatabaseAnonKey || __OLON_CFG['BoltDatabaseAnonKey'] || '';

window.olonDB = {
  'Bolt Database': null,

  // Keep the space-containing names as external API but use quoted keys so
  // the file remains valid JavaScript. The init method will read credentials
  // from window globals if present (both spaced and non-spaced variants) and
  // fall back to placeholders.
  async ['initBolt Database']() {
    if (this['Bolt Database']) return this['Bolt Database'];

    // Prefer window globals that may be injected by the environment.
    // Prefer OLON_CONFIG injected by WordPress, then VITE window vars
    const cfg = window.OLON_CONFIG || {};
    const urlFromOLON = cfg['Bolt DatabaseUrl'] || cfg.BoltDatabaseUrl || cfg['BoltDatabaseUrl'];
    const keyFromOLON = cfg['Bolt DatabaseAnonKey'] || cfg.BoltDatabaseAnonKey || cfg['BoltDatabaseAnonKey'];

    const urlFromWindow = window['VITE_Bolt Database_URL'] || window.VITE_BOLT_DATABASE_URL;
    const keyFromWindow = window['VITE_Bolt Database_ANON_KEY'] || window.VITE_BOLT_DATABASE_ANON_KEY;

    const BoltDatabaseUrl = urlFromOLON || urlFromWindow || '';
    const BoltDatabaseKey = keyFromOLON || keyFromWindow || '';

    if (!BoltDatabaseUrl || !BoltDatabaseKey) {
      console.warn('Bolt Database credentials not found in OLON_CONFIG or window VITE vars. Bolt Database client will not be initialized.');
      this['Bolt Database'] = null;
      return null;
    }

    this['Bolt Database'] = supabase.createClient(BoltDatabaseUrl, BoltDatabaseKey);
    return this['Bolt Database'];
  },
  
  async getCategories() {
    const { data, error } = await this['Bolt Database']
      .from('categories')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
    return data;
  },
  
  async getCategoryBySlug(slug) {
    const { data, error } = await this['Bolt Database']
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching category:', error);
      return null;
    }
    return data;
  },
  
  async getPosts(limit = null) {
    let query = this['Bolt Database']
      .from('posts')
      .select(`
        *,
        categories (
          id,
          name,
          slug,
          color,
          icon_up,
          icon_hover
        )
      `)
      .eq('published', true)
      .order('created_at', { ascending: false });
    
    if (limit) {
      query = query.limit(limit);
    }
    
  const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
    return data;
  },
  
  async getPostBySlug(slug) {
    const { data, error } = await this['Bolt Database']
      .from('posts')
      .select(`
        *,
        categories (
          id,
          name,
          slug,
          color,
          icon_up,
          icon_hover
        )
      `)
      .eq('slug', slug)
      .eq('published', true)
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching post:', error);
      return null;
    }
    return data;
  },
  
  async getPostsByCategory(categoryId, limit = null) {
    let query = this['Bolt Database']
      .from('posts')
      .select(`
        *,
        categories (
          id,
          name,
          slug,
          color,
          icon_up,
          icon_hover
        )
      `)
      .eq('category_id', categoryId)
      .eq('published', true)
      .order('created_at', { ascending: false });
    
    if (limit) {
      query = query.limit(limit);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching posts by category:', error);
      return [];
    }
    return data;
  }
};
