window.olonDB = {
  'Bolt Database': null,

  // Keep the space-containing names as external API but use quoted keys so
  // the file remains valid JavaScript. The init method will read credentials
  // from window globals if present (both spaced and non-spaced variants) and
  // fall back to placeholders.
  async ['initBolt Database']() {
    if (this['Bolt Database']) return this['Bolt Database'];

    // Prefer window globals that may be injected by the environment.
    const urlFromWindow = window['VITE_Bolt Database_URL'] || window.VITE_BOLT_DATABASE_URL;
    const keyFromWindow = window['VITE_Bolt Database_ANON_KEY'] || window.VITE_BOLT_DATABASE_ANON_KEY;

    const BoltDatabaseUrl = urlFromWindow || 'https://your-project.supabase.co';
    const BoltDatabaseKey = keyFromWindow || 'your-anon-key';

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
