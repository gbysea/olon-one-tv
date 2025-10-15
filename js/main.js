/**
 * OLON Sentiment TV - WordPress Main Entry Point
 */

document.addEventListener('DOMContentLoaded', async () => {
  console.log('OLON initializing...');

  if (typeof OLON_CONFIG === 'undefined' && typeof window.OLON_CONFIG === 'undefined') {
    console.error('OLON_CONFIG not found - check wp_localize_script');
    return;
  }

  // Initialize Bolt Database (use bracket notation for spaced names)
  if (window.olonDB && typeof window.olonDB['initBolt Database'] === 'function') {
    await window.olonDB['initBolt Database']();
  }

  // Initialize header logo and aura if present
  if (window.olonHeaderLogo && typeof window.olonHeaderLogo.init === 'function') {
    window.olonHeaderLogo.init('site-logo-img');
  }
  if (window.olonAura && typeof window.olonAura.initAura === 'function') {
    window.olonAura.initAura('top');
  }

  const path = window.location.pathname;

  if (path.includes('/category/')) {
    const slug = path.split('/category/')[1].replace('/', '');
    if (window.olonDB && typeof window.olonDB.getCategoryBySlug === 'function') {
      const category = await window.olonDB.getCategoryBySlug(slug);
      if (category) {
        const h1 = document.querySelector('h1'); if (h1) h1.textContent = category.name;
        if (window.olonDB.getPostsByCategory) await window.olonDB.getPostsByCategory(category.id);
        if (window.olonAura && typeof window.olonAura.changeAuraSentiment === 'function') window.olonAura.changeAuraSentiment(category.slug);
        if (window.olonHeaderLogo && typeof window.olonHeaderLogo.updateLogo === 'function') window.olonHeaderLogo.updateLogo(category.slug);
      }
    }
  } else if (path.includes('/post/')) {
    const slug = path.split('/post/')[1].replace('/', '');
    if (window.olonDB && typeof window.olonDB.getPostBySlug === 'function') {
      const post = await window.olonDB.getPostBySlug(slug);
      if (post) {
        const h1 = document.querySelector('h1'); if (h1) h1.textContent = post.title;
        const body = document.querySelector('.post-content-body'); if (body) body.innerHTML = post.content || post.excerpt || '';
        if (post.categories && post.categories.slug) {
          if (window.olonAura && typeof window.olonAura.changeAuraSentiment === 'function') window.olonAura.changeAuraSentiment(post.categories.slug);
          if (window.olonHeaderLogo && typeof window.olonHeaderLogo.updateLogo === 'function') window.olonHeaderLogo.updateLogo(post.categories.slug);
        }
      }
    }
  } else {
    // Homepage: trigger category & post loads if the legacy functions exist
    if (typeof loadCategories === 'function') await loadCategories();
    if (typeof loadRecentPosts === 'function') await loadRecentPosts();
  }

  console.log('OLON initialized successfully');
});
