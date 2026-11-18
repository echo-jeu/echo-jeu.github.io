// ÉCHO — bouton pause et feuille Reprendre / Recommencer / Menu (même feuille dans les 4 jeux, au style de chacun),
// et boutons HTML qui doublent les menus dessinés dans le canvas (accueil, options) pour les lecteurs d'écran et le clavier.
// Script classique chargé dans l'ordre par index.html (portée globale partagée avec les autres fichiers js/).
'use strict';

// =====================================================================
// Pause
// =====================================================================
const pauseBtn = document.getElementById('pauseBtn'), pausePan = document.getElementById('pause');
let pauseLangue = -1;

function textesPause() {
  if (pauseLangue === lang) return;
  pauseLangue = lang;
  pauseBtn.setAttribute('aria-label', LW('pauseBouton'));
  document.getElementById('pauseTitre').textContent = LW('pauseTitre');
  document.getElementById('pauseReprendre').textContent = LW('reprendre');
  document.getElementById('pauseRecommencer').textContent = LW('recommencer');
  document.getElementById('pauseMenu').textContent = LW('menu');
}
function ouvrirPause() {
  if (enPause || !(state === PLAY || state === DEAD || state === CLEAR)) return;
  enPause = true; textesPause();
  pausePan.hidden = false; defiPanneau(false);
  input.touching = false; input.joyId = null; input.aimArmed = false; keys.clear();
  sound.suspend(); try { speechSynthesis.cancel(); } catch (e) {}
  say(LW('sPause'));
  const b = document.getElementById('pauseReprendre'); if (b.focus) b.focus();
}
function fermerPause() {
  if (!enPause) return;
  enPause = false; pausePan.hidden = true;
  if (!document.hidden) sound.resume();
  last = performance.now(); // pas de saut de temps à la reprise
}
function reprendre() {
  fermerPause();
  if (state === CLEAR && dailyMode) defiPanneau(true);
  cv.focus({ preventScroll: true });
}
function majPause() {
  textesPause();
  const voir = (state === PLAY || state === DEAD || state === CLEAR) && !enPause;
  if (pauseBtn.hidden === voir) pauseBtn.hidden = !voir;
}
pauseBtn.addEventListener('click', () => { sound.init(); ouvrirPause(); });
document.getElementById('pauseReprendre').addEventListener('click', reprendre);
document.getElementById('pauseRecommencer').addEventListener('click', () => { fermerPause(); startLevel(); cv.focus({ preventScroll: true }); });
document.getElementById('pauseMenu').addEventListener('click', () => { goTitle(); say(L('sMenu')); cv.focus({ preventScroll: true }); });
pausePan.addEventListener('keydown', e => { if (e.key === 'Escape') { e.preventDefault(); reprendre(); } });

// =====================================================================
// Menus du canvas doublés en HTML (accessibilité) : un bouton transparent posé sur chaque bouton dessiné
// =====================================================================
const menuA11y = document.getElementById('menuA11y');
let menuSig = '';
function majMenuA11y() {
  let items = [];
  if (state === TITLE && !autres.ouvert()) items = titleButtons().map(b => ({ b, nom: b.label, clic: () => { sound.init(); titleChoix(b.k); } }));
  else if (state === OPTIONS) {
    const o = optionTextes();
    items = optionButtons().map(b => ({ b, nom: b.k === OPT_RETOUR ? L('back') : o.names[b.k] + ' : ' + o.values[b.k], clic: () => { sound.init(); optionAction(b.k); } }));
  }
  const sig = state + '|' + lang + '|' + vw + 'x' + vh + '|' + items.map(i => i.nom).join(';');
  if (sig === menuSig) return;
  menuSig = sig;
  const avaitFocus = menuA11y.contains && menuA11y.contains(document.activeElement) ? [...menuA11y.children].indexOf(document.activeElement) : -1;
  menuA11y.textContent = '';
  for (const it of items) {
    const bt = document.createElement('button');
    bt.type = 'button'; bt.textContent = it.nom;
    bt.style.left = it.b.x + 'px'; bt.style.top = it.b.y + 'px'; bt.style.width = it.b.w + 'px'; bt.style.height = it.b.h + 'px';
    bt.addEventListener('click', it.clic);
    menuA11y.appendChild(bt);
  }
  // le focus clavier reste sur le même bouton quand une valeur change (Options)
  if (avaitFocus >= 0 && menuA11y.children[avaitFocus]) menuA11y.children[avaitFocus].focus();
}
