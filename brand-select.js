/* Lighting Recipe — メーカー名の予測入力コンポーネント（自己完結・オフライン対応）
 * 使い方: attachBrandAutocomplete(inputEl, { cats:['strobe',...] | null, onPick:fn })
 *   cats … 絞り込むカテゴリ配列。null/未指定なら全ブランド。
 *   onPick … 候補を選んだ時に呼ぶ（省略可）。
 * data/brands.json を1回だけ読み込みキャッシュ。取得失敗時はドロップダウンを出さず、
 * 素の自由入力として動作する（＝壊れない）。
 */
(function () {
  'use strict';
  var _cache = null;
  function loadBrands() {
    if (_cache) return _cache;
    _cache = fetch('data/brands.json')
      .then(function (r) { return r.ok ? r.json() : { brands: [] }; })
      .then(function (d) { return (d && d.brands) || []; })
      .catch(function () { return []; });
    return _cache;
  }

  // スタイルは一度だけ注入
  function injectStyle() {
    if (document.getElementById('brand-dd-style')) return;
    var css =
      '.brand-dd-wrap{position:relative}' +
      '.brand-dd{position:absolute;left:0;right:0;top:100%;margin-top:3px;background:#141414;' +
        'border:1px solid #3a3a3a;border-radius:8px;max-height:190px;overflow-y:auto;z-index:300;' +
        'display:none;box-shadow:0 8px 24px rgba(0,0,0,.55);-webkit-overflow-scrolling:touch}' +
      '.brand-dd-item{padding:9px 11px;font-size:14px;color:#e8e8e8;cursor:pointer;display:flex;' +
        'align-items:center;justify-content:space-between;gap:8px;border-bottom:1px solid #222}' +
      '.brand-dd-item:last-child{border-bottom:none}' +
      '.brand-dd-item.active,.brand-dd-item:hover{background:#2a2218;color:#c8a96e}' +
      '.brand-dd-name{font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}' +
      '.brand-dd-sub{font-size:10px;color:#666;white-space:nowrap;overflow:hidden;' +
        'text-overflow:ellipsis;max-width:48%;text-align:right}';
    var s = document.createElement('style');
    s.id = 'brand-dd-style';
    s.textContent = css;
    document.head.appendChild(s);
  }

  function norm(s) { return (s || '').toLowerCase(); }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  window.attachBrandAutocomplete = function (input, opts) {
    if (!input || input.dataset.brandDd === '1') return; // 二重付与ガード
    opts = opts || {};
    var cats = opts.cats || null;
    injectStyle();
    input.dataset.brandDd = '1';
    input.setAttribute('autocomplete', 'off');

    // input を relative ラッパーで包む
    var wrap = document.createElement('div');
    wrap.className = 'brand-dd-wrap';
    input.parentNode.insertBefore(wrap, input);
    wrap.appendChild(input);
    var dd = document.createElement('div');
    dd.className = 'brand-dd';
    wrap.appendChild(dd);

    var brands = [];
    loadBrands().then(function (list) {
      brands = cats
        ? list.filter(function (b) {
            return (b.categories || []).some(function (c) { return cats.indexOf(c) !== -1; });
          })
        : list;
    });

    function match(q) {
      q = norm(q).trim();
      if (!brands.length) return [];
      if (!q) return brands.slice(0, 60);
      var res = [];
      brands.forEach(function (b) {
        var hay = [b.name].concat(b.aliases || []).map(norm);
        if (hay.some(function (h) { return h.indexOf(q) === 0; })) res.push({ b: b, r: 0 });
        else if (hay.some(function (h) { return h.indexOf(q) !== -1; })) res.push({ b: b, r: 1 });
      });
      res.sort(function (a, z) { return a.r - z.r; });
      return res.map(function (x) { return x.b; }).slice(0, 60);
    }

    var activeIdx = -1;
    function render(items) {
      activeIdx = -1;
      if (!items.length) { dd.style.display = 'none'; dd.innerHTML = ''; return; }
      dd.innerHTML = items.map(function (b) {
        var sub = (b.aliases && b.aliases.length)
          ? '<span class="brand-dd-sub">' + esc(b.aliases.join(' / ')) + '</span>' : '';
        return '<div class="brand-dd-item" data-name="' + esc(b.name) + '">' +
          '<span class="brand-dd-name">' + esc(b.name) + '</span>' + sub + '</div>';
      }).join('');
      dd.style.display = 'block';
    }
    function close() { dd.style.display = 'none'; activeIdx = -1; }
    function items() { return dd.querySelectorAll('.brand-dd-item'); }
    function setActive(i) {
      var els = items();
      if (!els.length) return;
      activeIdx = (i + els.length) % els.length;
      els.forEach(function (el, idx) { el.classList.toggle('active', idx === activeIdx); });
      els[activeIdx].scrollIntoView({ block: 'nearest' });
    }
    function pick(name) {
      input.value = name;
      close();
      if (typeof opts.onPick === 'function') opts.onPick(name);
    }

    input.addEventListener('focus', function () { render(match(input.value)); });
    input.addEventListener('input', function () { render(match(input.value)); });
    input.addEventListener('blur', function () { setTimeout(close, 150); }); // タップ確定を待つ
    input.addEventListener('keydown', function (e) {
      if (dd.style.display !== 'block') return;
      if (e.key === 'ArrowDown') { e.preventDefault(); setActive(activeIdx + 1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(activeIdx - 1); }
      else if (e.key === 'Enter' && activeIdx >= 0) {
        e.preventDefault(); e.stopPropagation();
        pick(items()[activeIdx].getAttribute('data-name'));
      } else if (e.key === 'Escape') { close(); }
    }, true); // capture: 既存のEnter→次フィールド処理より先に候補確定を優先
    dd.addEventListener('mousedown', function (e) {
      var it = e.target.closest ? e.target.closest('.brand-dd-item') : null;
      if (!it) return;
      e.preventDefault(); // blur を防いで確定
      pick(it.getAttribute('data-name'));
    });
  };
})();
