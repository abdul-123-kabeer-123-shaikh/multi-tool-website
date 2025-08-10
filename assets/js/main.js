function loadPartial(targetId, url) {
  fetch(url)
    .then(r => r.text())
    .then(html => { document.getElementById(targetId).innerHTML = html; hookAfterPartialLoad(targetId); })
    .catch(() => { document.getElementById(targetId).innerHTML = ''; });
}

function hookAfterPartialLoad(targetId) {
  if (targetId === 'header') {
    const input = document.getElementById('globalSearchInput');
    if (input) {
      input.addEventListener('input', () => filterTools(input.value));
    }
  }
}

function filterTools(query) {
  const q = (query || '').trim().toLowerCase();
  const cards = document.querySelectorAll('[data-tool-card]');
  cards.forEach(card => {
    const text = (card.dataset.tags + ' ' + card.querySelector('.card-title')?.textContent).toLowerCase();
    card.style.display = text.includes(q) ? '' : 'none';
  });
}

function initAds() {
  // Placeholder for ad scripts. Replace with AdSense or other network initializers.
}

function ready(fn) { document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn); }

ready(() => {
  const hasHeader = document.getElementById('header');
  const hasFooter = document.getElementById('footer');
  if (hasHeader) loadPartial('header', '/partials/header.html');
  if (hasFooter) loadPartial('footer', '/partials/footer.html');
  initAds();
});