import Bolt from './bolt-database-client.js';

export async function fetchCategories() {
  const { data, error } = await Bolt.from('categories').select('*').order('name');
  if (error) throw error;
  return data;
}

export function renderCategoryNav(categories, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const nav = document.createElement('nav');
  nav.className = 'category-nav';

  categories.forEach(cat => {
    const link = document.createElement('a');
    link.href = `/category/${cat.slug}`;
    link.className = 'category-link';

    const img = document.createElement('img');
    const base = (window.OLON_CONFIG && window.OLON_CONFIG.themeUrl) ? window.OLON_CONFIG.themeUrl : '/wp-content/themes/olon-one-tv';
    img.src = `${base}/assets/images/${cat.icon_up}`;
    img.alt = cat.name;

    link.addEventListener('mouseenter', () => img.src = `${base}/assets/images/${cat.icon_hover}`);
    link.addEventListener('mouseleave', () => img.src = `${base}/assets/images/${cat.icon_up}`);

    link.appendChild(img);
    nav.appendChild(link);
  });

  container.appendChild(nav);
  // set body class for category mode when clicking links
  nav.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    const slug = a.href.split('/').filter(Boolean).pop();
    if (slug) {
      document.body.className = document.body.className.replace(/\bcategory-mode-[^\s]+\b/g, '');
      document.body.classList.add(`category-mode-${slug}`);
    }
  });
}
