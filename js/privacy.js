// Code de privacy.html (sorti de la page pour la CSP sans script en ligne).
// Affiche la langue choisie (lien #xx) ou celle du navigateur ; toutes les sections restent dans la page.
(() => {
  const codes = ['fr', 'en', 'es', 'de', 'it', 'pt', 'ja'];
  const pick = () => {
    const h = location.hash.slice(1);
    if (codes.includes(h)) return h;
    for (const l of navigator.languages || [navigator.language || 'en']) { const c = String(l).slice(0, 2).toLowerCase(); if (codes.includes(c)) return c; }
    return 'en';
  };
  const show = () => {
    const c = pick();
    document.documentElement.lang = c;
    for (const s of document.querySelectorAll('main > section')) s.hidden = s.id !== c;
    for (const a of document.querySelectorAll('nav a')) a.setAttribute('aria-current', a.dataset.l === c ? 'true' : 'false');
  };
  addEventListener('hashchange', show);
  show();
})();

// « Ne pas être compté » : GoatCounter ne compte rien quand localStorage.skipgc === 't' (même règle que le Site).
// Hors web public (echo.aulit42369.fr, github.io) (appli Android, local) le jeu ne compte rien : le bouton est masqué.
(function () {
  var web = /(^|\.)github\.io$|^echo\.aulit42369\.fr$/.test(location.hostname);
  function off() { try { return localStorage.getItem('skipgc') === 't'; } catch (e) { return false; } }
  function maj() {
    var i = off() ? 1 : 0;
    document.querySelectorAll('.gc-choix').forEach(function (el) { el.hidden = !web; });
    document.querySelectorAll('[data-gc]').forEach(function (b) { b.textContent = b.getAttribute('data-gc').split('|')[i]; b.setAttribute('aria-pressed', String(!!i)); });
    document.querySelectorAll('[data-gc-etat]').forEach(function (s) { s.textContent = s.getAttribute('data-gc-etat').split('|')[i]; });
  }
  document.addEventListener('click', function (e) {
    if (!e.target.closest('[data-gc]')) return;
    try { if (off()) localStorage.removeItem('skipgc'); else localStorage.setItem('skipgc', 't'); } catch (err) { /* stockage bloqué */ }
    maj();
  });
  maj();
})();
