const palettes = [
  ['#3e0202','#5a0404','#6b1010','#c0a8d8','#9a80ba','#a880c8','#7a60a0',
   '#c0a8d8','#5a1010','#6b1010','#c0a8d8','#3e0202','#c0a8d8'],

  ['#bad797','#a8c880','#90b465','#670626','#880a3a','#770030','#550020',
   '#670626','#a0c070','#90b465','#670626','#bad797','#670626'],

  ['#cad183','#b8c070','#a0aa55','#66023c','#880550','#770042','#550030',
   '#66023c','#b0bc60','#a0aa55','#66023c','#cad183','#66023c'],

  ['#351431','#4a2048','#5e3060','#f55d3e','#ff7055','#ff8060','#ff9070',
   '#f55d3e','#4a1845','#5e3060','#f55d3e','#351431','#f55d3e'],

  ['#f0ecce','#e4e0be','#ccc8a0','#320b35','#50205a','#6a3890','#7848a0',
   '#320b35','#d8d4b0','#ccc8a0','#320b35','#f0ecce','#320b35'],

  ['#ffbdc5','#f0a8b2','#e09098','#670626','#880a38','#aa1850','#660028',
   '#670626','#f0a8b4','#e09098','#670626','#ffbdc5','#670626'],

  ['#cbd9ff','#b8c8f0','#a0b4e0','#3f6048','#2a4832','#183020','#0a1808',
   '#3f6048','#b0c4ec','#a0b4e0','#3f6048','#cbd9ff','#3f6048'],

  ['#badd7f','#a8cc68','#90b850','#391d01','#5a3010','#7a4818','#502200',
   '#391d01','#a0c860','#90b850','#391d01','#badd7f','#391d01'],

  ['#f5f4f0','#ece9e3','#ddd','#111','#444','#666','#999',
   '#111','#e0e0dc','#ddd','#111','#f5f4f0','#111'],
];

const paletteKeys = [
  '--color-bg','--color-bg-hover','--color-bg-grid',
  '--color-text','--color-text-muted','--color-text-dim','--color-text-faint',
  '--color-border','--color-border-ui','--color-border-nav',
  '--color-bar-bg','--color-bar-text','--color-shadow',
];

const palette = palettes[Math.floor(Math.random() * palettes.length)];
const root = document.documentElement;
paletteKeys.forEach((key, i) => root.style.setProperty(key, palette[i]));


const currentPage = window.location.pathname.split('/').pop();
document.querySelectorAll('.nav-link').forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('nav-link--active');
  }
});