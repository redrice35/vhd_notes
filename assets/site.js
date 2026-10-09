/* Theme toggle shared by every page (same storage key as the PH notes site,
   so a reader's choice carries across the two sites on the same origin). */
(function () {
  var btn = document.getElementById('themeToggle');
  if (!btn) return;
  var stored = null;
  try { stored = localStorage.getItem('ph-theme'); } catch (e) {}
  if (stored) document.documentElement.setAttribute('data-theme', stored);
  function isDark() {
    var t = document.documentElement.getAttribute('data-theme');
    if (t) return t === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  function paint() { btn.textContent = isDark() ? '☀️ 라이트모드' : '🌙 다크모드'; }
  btn.addEventListener('click', function () {
    var next = isDark() ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('ph-theme', next); } catch (e) {}
    paint();
  });
  paint();
})();

/* Class-of-recommendation chip: cls('IIa', 'B') -> <span class="chip cls-IIa">IIa · B</span> */
function chip(cls, level) {
  var key = cls === 'KSE' ? 'KR' : (cls === '—' ? 'none' : cls);
  var label = level ? cls + ' · ' + level : cls;
  return '<span class="chip cls-' + key + '">' + label + '</span>';
}
