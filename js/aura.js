window.olonAura = {
  currentAura: 'default',
  
  setAura(categorySlug) {
    const container = document.getElementById('aura-container');
    if (!container) return;
    
    container.className = 'aura-background';
    
    if (categorySlug && categorySlug !== 'default') {
      container.classList.add(`aura-${categorySlug}`);
    }
    
    const layers = container.querySelectorAll('.aura-layer');
    layers.forEach((layer, index) => {
      layer.classList.remove('active');
      setTimeout(() => {
        layer.classList.add('active');
      }, index * 200);
    });
    
    this.currentAura = categorySlug || 'default';
  },
  
  init() {
    this.setAura('default');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  window.olonAura.init();
});
