// ÉCHO — carte « Les autres jeux d'Aulit » : bouton sur l'accueil + panneau avec les 3 autres jeux.
// Textes dans i18n/strings.json (clés autres*), passés par la fonction L du jeu. Chargeable sous Node (tests).
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.AutresJeux = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  // Liens web des 3 autres jeux : à remplacer par le lien Play Store quand l'appli sera publiée.
  var JEUX = [
    { nom: 'LUMEN', cle: 'autresLumen', url: 'https://lumen.aulit42369.fr/', couleur: '#ffc94d' },
    { nom: 'Fragments', cle: 'autresFragments', url: 'https://fragments.aulit42369.fr/', couleur: '#c08bff' },
    { nom: 'Résonance', cle: 'autresResonance', url: 'https://resonance.aulit42369.fr/', couleur: '#5cf2ff' },
  ];
  // Styles dans css/echo.css (plus de <style> injecté : la CSP n'autorise plus 'unsafe-inline' depuis le 18/11/2026).

  /** L : fonction de traduction du jeu. Renvoie { maj(voirBouton), ouvert() }. */
  function init(doc, win, L) {
    var btn = doc.createElement('button'); btn.id = 'autresBtn'; btn.type = 'button'; btn.hidden = true;
    var pan = doc.createElement('div'); pan.id = 'autres'; pan.hidden = true;
    pan.setAttribute('role', 'dialog'); pan.setAttribute('aria-modal', 'true'); pan.setAttribute('aria-labelledby', 'autresTitre');
    var hote = doc.querySelector('main') || doc.body; // dans le <main> de la page (repère d'accessibilité)
    hote.appendChild(btn); hote.appendChild(pan);
    var langue = null, historique = false;

    function remplir() {
      pan.textContent = '';
      var h = doc.createElement('h2'); h.id = 'autresTitre'; h.textContent = L('autresTitre'); pan.appendChild(h);
      var p = doc.createElement('p'); p.className = 'note'; p.textContent = L('autresOuvrir'); pan.appendChild(p);
      JEUX.forEach(function (j) {
        var a = doc.createElement('a'); a.href = j.url; a.target = '_blank'; a.rel = 'noopener'; a.style.setProperty('--c', j.couleur);
        var b = doc.createElement('b'); b.textContent = j.nom;
        var s = doc.createElement('span'); s.textContent = L(j.cle);
        a.appendChild(b); a.appendChild(s); pan.appendChild(a);
      });
      var r = doc.createElement('button'); r.type = 'button'; r.textContent = L('back'); r.addEventListener('click', fermer); pan.appendChild(r);
    }
    function ouvrir() {
      remplir(); pan.hidden = false;
      try { win.history.pushState({ autres: 1 }, ''); historique = true; } catch (e) { historique = false; }
      var a = pan.querySelector('a'); if (a) a.focus();
    }
    function fermer() {
      if (pan.hidden) return;
      pan.hidden = true; btn.focus();
      if (historique) { historique = false; try { win.history.back(); } catch (e) { /* rien */ } }
    }
    btn.addEventListener('click', ouvrir);
    pan.addEventListener('keydown', function (e) { if (e.key === 'Escape') { e.preventDefault(); fermer(); } });
    // retour d'Android : ferme le panneau sans quitter le jeu
    win.addEventListener('popstate', function () { if (!pan.hidden) { historique = false; pan.hidden = true; btn.focus(); } });

    return {
      maj: function (voir, lang) {
        if (lang !== langue) { langue = lang; btn.textContent = L('autresBouton'); if (!pan.hidden) remplir(); }
        if (btn.hidden === voir) btn.hidden = !voir;
        if (!voir && !pan.hidden) fermer();
      },
      ouvert: function () { return !pan.hidden; },
    };
  }

  return { JEUX: JEUX, init: init };
});
