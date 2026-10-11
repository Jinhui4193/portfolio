
console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

let pages = [
  { url: '', title: 'Home' },
  { url: 'projects/', title: 'Projects' },
  { url: 'contact/', title: 'Contact' },
  { url: 'resume/', title: 'Resume' },
  { url: 'https://github.com/Jinhui4193', title: 'GitHub' }
];

const BASE_PATH = (
  location.hostname === 'localhost' ||
  location.hostname === '127.0.0.1'
) ? '/' : '/portfolio/';

let nav = document.createElement('nav');
document.body.prepend(nav);

for (let p of pages) {
  let url = p.url;
  let title = p.title;

  if (!url.startsWith('http')) {
    url = BASE_PATH + url;
  }

  // Create a link
  let a = document.createElement('a');
  a.href = url;
  a.textContent = title;

  // Highlight the current page
  let currentPath = location.pathname.replace(/index\.html$/, '');

  if (a.host === location.host &&
      a.pathname === currentPath) {
    a.classList.add('current');
  }

  // Open external links in a new tab
  if (a.host !== location.host) {
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
  }

  nav.append(a);
}

document.body.insertAdjacentHTML(
  'afterbegin',
  `
  <label class="color-scheme">
    Theme:
    <select>
      <option value="light dark">Automatic</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  </label>
  `
);


let select = document.querySelector('.color-scheme select');

select.addEventListener('input', function (event) {
  console.log('color scheme changed to', event.target.value);

  document.documentElement.style.setProperty(
    'color-scheme',
    event.target.value
  );

  localStorage.colorScheme = event.target.value;
});

// Restore saved theme when the page loads
if ('colorScheme' in localStorage) {
  let savedScheme = localStorage.colorScheme;

  document.documentElement.style.setProperty(
    'color-scheme',
    savedScheme
  );

  select.value = savedScheme;
}

