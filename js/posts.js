async function loadRecentPosts(limit = 6) {
  const grid = document.getElementById('recent-posts');
  if (!grid) return;
  
  const posts = await window.olonDB.getPosts(limit);
  
  if (!posts || posts.length === 0) {
    grid.innerHTML = '<p class="text-center">No posts found.</p>';
    return;
  }
  
  grid.innerHTML = posts.map(post => {
    const category = post.categories;
    const categoryColor = category?.color || '#666';
    
    return `
      <a href="/post.html?slug=${post.slug}" class="post-card"
         style="--post-category-color: ${categoryColor};">
        ${post.featured_image ? 
          `<img src="${post.featured_image}" alt="${post.title}" class="post-image">` : 
          ''}
        <div class="post-content">
          ${category ? 
            `<span class="post-category" style="background: ${categoryColor};">
              ${category.name}
            </span>` : 
            ''}
          <h3 class="post-title">${post.title}</h3>
          <p class="post-excerpt">${post.excerpt || ''}</p>
          <div class="post-meta">
            <span>${new Date(post.created_at).toLocaleDateString()}</span>
          </div>
        </div>
      </a>
    `;
  }).join('');
}

async function loadPostPage(slug) {
  const post = await window.olonDB.getPostBySlug(slug);
  
  if (!post) {
    document.getElementById('post-detail').innerHTML = `
      <div class="container">
        <h1>Post not found</h1>
        <p>This post does not exist or has been removed.</p>
      </div>
    `;
    return;
  }
  
  const category = post.categories;
  
  if (category) {
    window.olonAura.setAura(category.slug);
    window.olonHeaderLogo.setCategory(category);
  }
  
  document.title = `${post.title} - OLON Sentiment TV`;
  
  document.getElementById('post-detail').innerHTML = `
    <div class="container">
      ${post.featured_image ? 
        `<img src="${post.featured_image}" alt="${post.title}" class="post-image">` : 
        ''}
      ${category ? 
        `<span class="post-category" style="background: ${category.color};">
          ${category.name}
        </span>` : 
        ''}
      <h1 class="post-title">${post.title}</h1>
      <div class="post-meta mb-4">
        <span>${new Date(post.created_at).toLocaleDateString()}</span>
      </div>
      <div class="post-body">
        ${post.content || post.excerpt || ''}
      </div>
    </div>
  `;
  
  if (category) {
    const relatedPosts = await window.olonDB.getPostsByCategory(category.id, 3);
    const filteredPosts = relatedPosts.filter(p => p.id !== post.id).slice(0, 3);
    
    const relatedGrid = document.getElementById('related-posts');
    if (filteredPosts.length > 0) {
      relatedGrid.innerHTML = filteredPosts.map(p => `
        <a href="/post.html?slug=${p.slug}" class="post-card"
           style="--post-category-color: ${category.color};">
          ${p.featured_image ? 
            `<img src="${p.featured_image}" alt="${p.title}" class="post-image">` : 
            ''}
          <div class="post-content">
            <span class="post-category" style="background: ${category.color};">
              ${category.name}
            </span>
            <h3 class="post-title">${p.title}</h3>
            <p class="post-excerpt">${p.excerpt || ''}</p>
          </div>
        </a>
      `).join('');
    } else {
      relatedGrid.innerHTML = '<p class="text-center">No related posts found.</p>';
    }
  }
}
