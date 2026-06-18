
const positions = [
  { x: 2,  y: 2  },
  { x: 30, y: 5  },
  { x: 58, y: 0  },
  { x: 76, y: 8  },
  { x: 10, y: 35 },
  { x: 38, y: 30 },
  { x: 64, y: 32 },
  { x: 5,  y: 62 },
  { x: 28, y: 60 },
  { x: 52, y: 58 },
  { x: 74, y: 55 },
  { x: 18, y: 82 },
];

const widths = [220, 200, 240, 190, 210, 230, 200, 220, 190, 240, 210, 200];

const table = document.getElementById('photo-table');
const photos = Array.from(document.querySelectorAll('.photo'));

function layoutPhotos() {
  if (window.innerWidth < 768) return;

  const tableW = table.offsetWidth;
  const tableH = table.offsetHeight;

  photos.forEach((photo, i) => {
    const rot = parseFloat(photo.dataset.rot) || 0;
    const pos = positions[i] ?? {
      x: 5 + Math.random() * 70,
      y: 5 + Math.random() * 70,
    };
    const w = widths[i] ?? 200;

    photo.style.width  = w + 'px';
    photo.style.height = 'auto';
    photo.style.left   = (tableW * pos.x / 100) + 'px';
    photo.style.top    = (tableH * pos.y / 100) + 'px';
    photo.style.transform = `rotate(${rot}deg)`;
  });
}

layoutPhotos();
window.addEventListener('resize', layoutPhotos);

// hover straighten and lift slightly
photos.forEach(photo => {
  const rot = parseFloat(photo.dataset.rot) || 0;

  photo.addEventListener('mouseenter', () => {
    photo.style.transform = `rotate(0deg) translateY(-4px)`;
    photo.style.zIndex = 10;
  });

  photo.addEventListener('mouseleave', () => {
    photo.style.transform = `rotate(${rot}deg)`;
    photo.style.zIndex = 1;
  });
});


// lightbox
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';

const lbImg = document.createElement('img');
lbImg.alt = 'Photo enlarged';

const lbClose = document.createElement('button');
lbClose.id = 'lightbox-close';
lbClose.textContent = '✕';
lbClose.setAttribute('aria-label', 'Close');

lightbox.appendChild(lbImg);
lightbox.appendChild(lbClose);
document.body.appendChild(lightbox);

photos.forEach(photo => {
  photo.addEventListener('click', () => {
    const src = photo.querySelector('img').src;
    lbImg.src = src;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

lbClose.addEventListener('click', e => { e.stopPropagation(); closeLightbox(); });
lightbox.addEventListener('click', closeLightbox);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

//carousel
const slides = Array.from(document.querySelectorAll('.amfi-slide'));
const prevBtn = document.getElementById('amfi-prev');
const nextBtn = document.getElementById('amfi-next');
const currentEl = document.getElementById('amfi-current');
const totalEl = document.getElementById('amfi-total');

let current = 0;

totalEl.textContent = slides.length;

function goTo(index) {
  slides[current].classList.remove('active');
  current = index;
  slides[current].classList.add('active');
  currentEl.textContent = current + 1;
  prevBtn.disabled = current === 0;
  nextBtn.disabled = current === slides.length - 1;
}

// init
goTo(0);

prevBtn.addEventListener('click', () => { if (current > 0) goTo(current - 1); });
nextBtn.addEventListener('click', () => { if (current < slides.length - 1) goTo(current + 1); });

// keyboard nav
document.addEventListener('keydown', e => {
  if (lightbox.classList.contains('open')) return;
  if (e.key === 'ArrowLeft' && current > 0) goTo(current - 1);
  if (e.key === 'ArrowRight' && current < slides.length - 1) goTo(current + 1);
});

// lightbox for carousel slides
slides.forEach(slide => {
  slide.style.cursor = 'pointer';
  slide.addEventListener('click', () => {
    const src = slide.querySelector('img').src;
    lbImg.src = src;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});