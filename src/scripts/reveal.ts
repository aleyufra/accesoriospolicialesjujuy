/**
 * Animación de aparición para elementos `[data-reveal]` que están debajo del pliegue.
 * Mejora progresiva: sin JS o con `prefers-reduced-motion` el contenido se ve igual.
 *
 * - `data-reveal-delay="140"` → retraso en ms.
 * - `[data-reveal-grid]` → sus hijos reciben un retraso escalonado por columna.
 */
const STAGGER_MS = 70;

function staggerGrids(): void {
  document.querySelectorAll<HTMLElement>('[data-reveal-grid]').forEach((grid) => {
    const cols = getComputedStyle(grid).gridTemplateColumns.split(' ').length || 1;
    Array.from(grid.children).forEach((child, i) => {
      if (child instanceof HTMLElement) child.dataset.revealDelay = String((i % cols) * STAGGER_MS);
    });
  });
}

function setupReveal(): void {
  const viewportHeight = window.innerHeight;
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        el.style.opacity = '1';
        el.style.transform = 'none';
        observer.unobserve(el);
      }
    },
    { rootMargin: '0px 0px -6% 0px' },
  );

  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    if (el.getBoundingClientRect().top < viewportHeight) return;
    const delay = el.dataset.revealDelay ?? '0';
    el.style.transition = `opacity .6s ease ${delay}ms, transform .6s ease ${delay}ms`;
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    observer.observe(el);
  });
}

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion && 'IntersectionObserver' in window) {
  requestAnimationFrame(() => {
    staggerGrids();
    setupReveal();
  });
}
