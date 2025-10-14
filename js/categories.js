async function loadCategories() {
  const grid = document.getElementById('category-grid');
  if (!grid) return;
  
  const categories = await window.olonDB.getCategories();
  
  if (!categories || categories.length === 0) {
    grid.innerHTML = '<p class="text-center">No categories found.</p>';
    return;
  }
  
  grid.innerHTML = categories.map(cat => `
    <a href="/category.html?slug=${cat.slug}" class="category-card" 
       style="--category-color: ${cat.color};"
       data-slug="${cat.slug}">
      <img src="${cat.icon_up}" alt="${cat.name}" class="category-icon" 
           data-hover="${cat.icon_hover}"
           data-up="${cat.icon_up}">
      <h3 class="category-name">${cat.name}</h3>
      <p class="category-description">${cat.description || ''}</p>
      <p class="category-count">${cat.post_count || 0} posts</p>
    </a>
  `).join('');
  
  grid.querySelectorAll('.category-card').forEach(card => {
    const img = card.querySelector('img');
    const hoverSrc = img.dataset.hover;
    const upSrc = img.dataset.up;
    
    card.addEventListener('mouseenter', () => {
      if (hoverSrc) img.src = hoverSrc;
    });
    
    card.addEventListener('mouseleave', () => {
      if (upSrc) img.src = upSrc;
    });
  });
}

async function loadCategoryPage(slug) {
  const category = await window.olonDB.getCategoryBySlug(slug);
  
  if (!category) {
    document.getElementById('category-header').innerHTML = 
      '<h1>Category not found</h1>';
    document.getElementById('post-grid').innerHTML = 
      '<p class="text-center">This category does not exist.</p>';
    return;
  }
  
  window.olonAura.setAura(category.slug);
  window.olonHeaderLogo.setCategory(category);
  
  document.getElementById('category-header').innerHTML = `
    <img src="${category.icon_up}" alt="${category.name}" 
         style="width: 120px; height: 120px;">
    <h1 style="color: ${category.color};">${category.name}</h1>
    <p class="text-lg">${category.description || ''}</p>
  `;
  
  const posts = await window.olonDB.getPostsByCategory(category.id);
  
  const postGrid = document.getElementById('post-grid');
  if (!posts || posts.length === 0) {
    postGrid.innerHTML = '<p class="text-center">No posts in this category yet.</p>';
    return;
  }
  
  postGrid.innerHTML = posts.map(post => `
    <a href="/post.html?slug=${post.slug}" class="post-card"
       style="--post-category-color: ${category.color};">
      ${post.featured_image ? 
        `<img src="${post.featured_image}" alt="${post.title}" class="post-image">` : 
        ''}
      <div class="post-content">
        <span class="post-category" style="background: ${category.color};">
          ${category.name}
        </span>
        <h3 class="post-title">${post.title}</h3>
        <p class="post-excerpt">${post.excerpt || ''}</p>
        <div class="post-meta">
          <span>${new Date(post.created_at).toLocaleDateString()}</span>
        </div>
      </div>
    </a>
  `).join('');
}

async function loadFooterCategories() {
  const footer = document.getElementById('footer-categories');
  if (!footer) return;
  
  const categories = await window.olonDB.getCategories();
  
  footer.innerHTML = categories.map(cat => 
    `<a href="/category.html?slug=${cat.slug}">${cat.name}</a>`
  ).join('');
}
