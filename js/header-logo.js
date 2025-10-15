window.olonHeaderLogo = {
  currentCategory: null,
  logoImage: null,
  
  init() {
    const logo = document.querySelector('.site-logo');
    if (!logo) return;
    
    const existingImg = logo.querySelector('img');
    if (!existingImg) {
      this.logoImage = document.createElement('img');
      this.logoImage.alt = 'OLON';
      logo.insertBefore(this.logoImage, logo.firstChild);
    } else {
      this.logoImage = existingImg;
    }
    
    this.updateLogo(null);
    
    logo.addEventListener('mouseenter', () => this.onHover());
    logo.addEventListener('mouseleave', () => this.onLeave());
  },
  
  setCategory(category) {
    this.currentCategory = category;
    this.updateLogo(category);
  },
  
    updateLogo(categorySlug) {
      const img = document.querySelector('#site-logo-img img');
      if (!img) return;
      const base = (typeof OLON_CONFIG !== 'undefined') ? (OLON_CONFIG.themeUrl || '') : '';
      img.dataset.up = `${base}/assets/images/${categorySlug}-UP-olon-120.png`;
      img.dataset.hover = `${base}/assets/images/${categorySlug}-HOVER-olon-120.png`;
      img.src = img.dataset.up;
    },
  
  onHover() {
    if (!this.logoImage || !this.logoImage.dataset.hover) return;
    this.logoImage.src = this.logoImage.dataset.hover;
  },
  
  onLeave() {
    if (!this.logoImage || !this.logoImage.dataset.up) return;
    this.logoImage.src = this.logoImage.dataset.up;
  }
};

  if (typeof window !== 'undefined') {
    window.olonHeaderLogo.updateLogo = updateLogo;
  }
