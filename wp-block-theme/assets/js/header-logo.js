export function initHeaderLogo(rootId) {
  const root = document.getElementById(rootId);
  if (!root) return;
  // Expect an <img data-up="..." data-hover="..."> inside root
  const img = root.querySelector('img');
  if (!img) return;
  img.addEventListener('mouseenter', () => {
    const hover = img.dataset.hover;
    if (hover) img.src = hover;
  });
  img.addEventListener('mouseleave', () => {
    const up = img.dataset.up;
    if (up) img.src = up;
  });
}

// Expose initializer on global
if (typeof window !== 'undefined') {
  window.olonHeaderLogo = window.olonHeaderLogo || {};
  window.olonHeaderLogo.init = initHeaderLogo;
}

// Update logo based on category slug
export function updateLogo(categorySlug) {
  const img = document.querySelector('#site-logo-img img');
  if (!img) return;
  const base = (window.OLON_CONFIG && window.OLON_CONFIG.themeUrl)
    ? window.OLON_CONFIG.themeUrl
    : (window.location ? window.location.origin + '/wp-content/themes/olon-one-tv' : '/wp-content/themes/olon-one-tv');
  img.dataset.up = `${base}/assets/images/${categorySlug}-UP-olon-120.png`;
  img.dataset.hover = `${base}/assets/images/${categorySlug}-HOVER-olon-120.png`;
  img.src = img.dataset.up;
}

if (typeof window !== 'undefined') {
  window.olonHeaderLogo.updateLogo = updateLogo;
}

// Auto-init for legacy themes: look for #site-logo-img and call init
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (window.olonHeaderLogo && window.olonHeaderLogo.init) window.olonHeaderLogo.init('site-logo-img');
    });
  } else {
    if (window.olonHeaderLogo && window.olonHeaderLogo.init) window.olonHeaderLogo.init('site-logo-img');
  }
}
