// ÉCHO — textes propres à la version web (pause, réglages Son / Vibrations / Mouvement réduit), 7 langues.
// Script classique chargé juste après js/i18n.js (portée globale partagée avec les autres fichiers js/).
// Hors du bloc généré <i18n:auto> : gen_i18n.py (projet Android) ne les connaît pas et ne les efface donc pas.
// À reporter dans i18n/strings.json du projet Android le jour où l'appli reçoit les mêmes écrans (voir A_FAIRE.md).
'use strict';

// Ordre des langues = I18N.langs : fr, en, es, de, it, pt, ja
const TW = {
  pauseTitre: ['PAUSE', 'PAUSE', 'PAUSA', 'PAUSE', 'PAUSA', 'PAUSA', '一時停止'],
  pauseBouton: ['Pause', 'Pause', 'Pausa', 'Pause', 'Pausa', 'Pausar', '一時停止'],
  reprendre: ['REPRENDRE', 'RESUME', 'CONTINUAR', 'WEITER', 'RIPRENDI', 'CONTINUAR', '再開'],
  recommencer: ['RECOMMENCER', 'RESTART', 'REINICIAR', 'NEU STARTEN', 'RICOMINCIA', 'RECOMEÇAR', 'やり直す'],
  menu: ['MENU', 'MENU', 'MENÚ', 'MENÜ', 'MENU', 'MENU', 'メニュー'],
  optSon: ['SON', 'SOUND', 'SONIDO', 'TON', 'SUONO', 'SOM', 'サウンド'],
  optVib: ['VIBRATIONS', 'VIBRATION', 'VIBRACIÓN', 'VIBRATION', 'VIBRAZIONE', 'VIBRAÇÃO', '振動'],
  optMouv: ['MOUVEMENT RÉDUIT', 'REDUCED MOTION', 'MOVIMIENTO REDUCIDO', 'WENIGER BEWEGUNG', 'MOVIMENTO RIDOTTO', 'MOVIMENTO REDUZIDO', '動きを減らす'],
  descSon: ['Effets sonores et ambiance', 'Sound effects and ambience', 'Efectos de sonido y ambiente', 'Soundeffekte und Atmosphäre',
    'Effetti sonori e atmosfera', 'Efeitos sonoros e ambiente', '効果音と環境音'],
  descVib: ['Vibre au rythme du cœur et des chocs', 'Vibrates with heartbeats and impacts', 'Vibra con los latidos y los golpes',
    'Vibriert bei Herzschlag und Stößen', 'Vibra con il battito e gli urti', 'Vibra com os batimentos e os impactos', '鼓動や衝撃で振動'],
  descMouv: ['Coupe la secousse de l\'écran et les rebonds', 'No screen shake or bouncing', 'Sin sacudidas de pantalla ni rebotes',
    'Kein Bildschirmwackeln, keine Sprünge', 'Niente scosse dello schermo né rimbalzi', 'Sem tremor de tela nem saltos', '画面の揺れと弾みをオフ'],
  sPause: ['Pause', 'Paused', 'Pausa', 'Pause', 'Pausa', 'Pausa', '一時停止'],
};
// Texte web traduit ; {0}, {1}… remplacés par les arguments (même règle que L)
const LW = (key, ...a) => { let r = (TW[key] || [])[lang] || key; a.forEach((v, i) => { r = r.split('{' + i + '}').join(String(v)); }); return r; };
