import { initBoltDatabase } from './olon-api.js';
import './aura.js';
import './header-logo.js';
import { renderCategoryNav, fetchCategories } from './categories.js';
import { loadAllPosts } from './posts.js';

async function initOLON() {
  try {
    await initBoltDatabase();
  } catch (e) { console.error(e); }

  // initialize header logo (if element exists)
  if (window.olonHeaderLogo && typeof window.olonHeaderLogo.init === 'function') {
    window.olonHeaderLogo.init('site-logo-img');
  }

  // load categories into #category-grid
  try {
    const cats = await fetchCategories();
    if (cats && cats.length && document.getElementById('category-grid')) {
      renderCategoryNav(cats, 'category-grid');
    }
  } catch (e) { console.error(e); }

  if (document.getElementById('post-grid') || document.getElementById('posts-container')) {
    await loadAllPosts().catch(console.error);
  }
}

document.addEventListener('DOMContentLoaded', initOLON);
