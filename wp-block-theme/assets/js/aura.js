export function calculateAura(votes = {}) {
  const total = Object.values(votes).reduce((s, v) => s + (v || 0), 0);
  if (total === 0) return { color: '#888', intensity: 0 };
  const score = (
    (votes.up || 0) * 1 +
    (votes.charm || 0) * 1.5 +
    (votes.top || 0) * 2 -
    (votes.down || 0) * 1 -
    (votes.strange || 0) * 1.5 -
    (votes.bottom || 0) * 2
  ) / total;
  const hue = score > 0 ? 120 + (score * 60) : 0 - (score * 60);
  const intensity = Math.abs(score) * 100;
  return { color: `hsl(${hue}, 70%, 50%)`, intensity };
}

export function applyAura(element, aura) {
  if (!element) return;
  element.style.boxShadow = `0 0 ${aura.intensity}px ${aura.color}`;
  element.style.borderColor = aura.color;
}

// Expose to global for theme usage
if (typeof window !== 'undefined') {
  window.olonAura = window.olonAura || {};
  window.olonAura.calculateAura = calculateAura;
  window.olonAura.applyAura = applyAura;
}
