window.olonDB = {
  Bolt Database: null,
  
  async initBolt Database() {
    if (this.Bolt Database) return this.Bolt Database;
    
    const Bolt DatabaseUrl = 'https://your-project.supabase.co';
    const Bolt DatabaseKey = 'your-anon-key';
    
    this.Bolt Database = supabase.createClient(Bolt DatabaseUrl, Bolt DatabaseKey);
    return this.Bolt Database;
  },
  
  async getCategories() {
    const { data, error } = await this.Bolt Database
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
    const { data, error } = await this.Bolt Database
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
    let query = this.Bolt Database
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
    const { data, error } = await this.Bolt Database
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
    let query = this.Bolt Database
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
