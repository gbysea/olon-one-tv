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
  
  updateLogo(category) {
    if (!this.logoImage) return;
    
    if (category && category.icon_up) {
      this.logoImage.src = category.icon_up;
      this.logoImage.dataset.hoverSrc = category.icon_hover || category.icon_up;
      this.logoImage.dataset.upSrc = category.icon_up;
    } else {
      this.logoImage.src = '/images/up-UP-olon-120.png';
      this.logoImage.dataset.hoverSrc = '/images/up-HOVER-olon-120.png';
      this.logoImage.dataset.upSrc = '/images/up-UP-olon-120.png';
    }
  },
  
  onHover() {
    if (!this.logoImage || !this.logoImage.dataset.hoverSrc) return;
    this.logoImage.src = this.logoImage.dataset.hoverSrc;
  },
  
  onLeave() {
    if (!this.logoImage || !this.logoImage.dataset.upSrc) return;
    this.logoImage.src = this.logoImage.dataset.upSrc;
  }
};
