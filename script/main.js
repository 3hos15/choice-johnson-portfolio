function makeDraggable(el) {
  const bar = el.querySelector('.win-bar');
  if (!bar) return;

  let startMX, startMY, startL, startT, dragging = false;

  bar.addEventListener('mousedown', e => {
    if (e.target.closest('.win-x')) return;
    dragging = true;
    startMX = e.clientX;
    startMY = e.clientY;
    startL = parseInt(el.style.left) || 0;
    startT = parseInt(el.style.top) || 0;
    e.preventDefault();
  });

  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    const nx = Math.max(0, Math.min(window.innerWidth - el.offsetWidth, startL + e.clientX - startMX));
    const ny = Math.max(0, Math.min(window.innerHeight - 52 - el.offsetHeight, startT + e.clientY - startMY));
    el.style.left = nx + 'px';
    el.style.top = ny + 'px';
  });

  document.addEventListener('mouseup', () => dragging = false);
}

function openAt(el, x, y) {
  el.style.left = x + 'px';
  el.style.top = y + 'px';
  el.showPopover();
}

function randomPos() {
  const margin = 20;
  const x = margin + Math.random() * (window.innerWidth - 340 - margin);
  const y = margin + Math.random() * (window.innerHeight - 220 - 52 - margin);
  return { x, y };
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const allWindows = Array.from(document.querySelectorAll('[popover].win'));

allWindows.forEach((el, i) => {
  makeDraggable(el);
  const delay = reducedMotion ? 0 : i * 160;
  setTimeout(() => {
    const { x, y } = randomPos();
    openAt(el, x, y);
    if (!reducedMotion) Math.random() * 400, 70;
  }, delay);
});

