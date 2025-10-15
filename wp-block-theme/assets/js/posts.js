import Bolt from './bolt-database-client.js';

export async function fetchPosts() {
  const { data, error } = await Bolt
    .from('posts')
    .select(`*, categories (slug, name, icon_up, icon_hover)`)
    .eq('status', 'published')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function fetchPostsByCategory(categorySlug) {
  const { data, error } = await Bolt
    .from('posts')
    .select(`*, categories!inner (slug, name, icon_up, icon_hover)`)
    .eq('categories.slug', categorySlug)
    .eq('status', 'published')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function fetchPostBySlug(slug) {
  const { data, error } = await Bolt
    .from('posts')
    .select(`*, categories (slug, name, icon_up, icon_hover)`)
    .eq('slug', slug)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function recordVote(postId, voteType, userIdentifier) {
  const { data, error } = await Bolt
    .from('user_post_votes')
    .insert({ post_id: postId, vote_type: voteType, user_identifier: userIdentifier });
  return { data, error };
}

export async function loadAllPosts() {
  const posts = await fetchPosts();
  const container = document.getElementById('posts-container');
  if (!container) return;
  container.innerHTML = '';
  posts.forEach(post => {
    const card = document.createElement('article');
    card.className = 'post-card';
    card.innerHTML = `
      <h2 class="post-title"><a href="/post/${post.slug}">${post.title}</a></h2>
      <p class="post-excerpt">${post.excerpt || ''}</p>
    `;
    // apply aura if votes exist
    if (window.olonAura && typeof window.olonAura.applyAura === 'function' && post.votes) {
      const aura = window.olonAura.calculateAura(post.votes);
      window.olonAura.applyAura(card, aura);
    }
    container.appendChild(card);
  });
}
