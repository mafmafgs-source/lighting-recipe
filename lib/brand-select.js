/* Lighting Recipe — メーカー名／型番の予測入力コンポーネント（自己完結・オフライン対応）
 *  attachBrandAutocomplete(inputEl, { cats:['strobe',...]|null, onPick:fn })
 *    メーカー名欄に。ブランドを cats で絞り込み。名前＋別名(aliases)で検索。
 *  attachModelAutocomplete(inputEl, { makerInput:el, cats:[...]|null, onPick:fn })
 *    型番欄に。makerInput の値からブランドを解決し、そのブランドの型番を候補表示。
 *    α/a・大文字小文字・空白を吸収して照合。
 * brands.json / models.json を各1回だけ読み込みキャッシュ。取得失敗時は候補を出さず
 * 素の自由入力として動作する（＝壊れない）。
 */
(function () {
  'use strict';

  var _brandCache = null, _modelCache = null;
  function loadBrands() {
    if (_brandCache) return _brandCache;
    _brandCache = fetch('brands.json')
      .then(function (r) { return r.ok ? r.json() : { brands: [] }; })
      .then(function (d) { return (d && d.brands) || []; })
      .catch(function () { return []; });
    return _brandCache;
  }
  function loadModels() {
    if (_modelCache) return _modelCache;
    _modelCache = fetch('models.json')
      .then(function (r) { return r.ok ? r.json() : { models: {} }; })
      .then(function (d) { return (d && d.models) || {}; })
      .catch(function () { return {}; });
    return _modelCache;
  }

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
  // 型番照合用：小文字化＋α→a＋全角空白/連続空白を単一空白に
  function normModel(s) {
    return norm(s).replace(/α/g, 'a').replace(/　/g, ' ').replace(/\s+/g, ' ').trim();
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  // 前方一致優先の絞り込み。keysFn(item)=検索対象文字列の配列、normFn=正規化関数
  function rank(arr, q, keysFn, normFn) {
    var res = [];
    arr.forEach(function (x) {
      var hay = keysFn(x).map(normFn);
      if (hay.some(function (h) { return h.indexOf(q) === 0; })) res.push({ x: x, r: 0 });
      else if (hay.some(function (h) { return h.indexOf(q) !== -1; })) res.push({ x: x, r: 1 });
    });
    res.sort(function (a, z) { return a.r - z.r; });
    return res.map(function (o) { return o.x; });
  }

  // 汎用ドロップダウン。getMatches(query)=[{name, sub?}] を返す（同期でもPromiseでも可）
  function attachAutocomplete(input, opts) {
    if (!input || input.dataset.brandDd === '1') return; // 二重付与ガード
    injectStyle();
    input.dataset.brandDd = '1';
    input.setAttribute('autocomplete', 'off');

    var wrap = document.createElement('div');
    wrap.className = 'brand-dd-wrap';
    input.parentNode.insertBefore(wrap, input);
    wrap.appendChild(input);
    var dd = document.createElement('div');
    dd.className = 'brand-dd';
    wrap.appendChild(dd);

    var activeIdx = -1;
    function render(items) {
      activeIdx = -1;
      if (!items || !items.length) { dd.style.display = 'none'; dd.innerHTML = ''; return; }
      dd.innerHTML = items.map(function (it) {
        var sub = it.sub ? '<span class="brand-dd-sub">' + esc(it.sub) + '</span>' : '';
        return '<div class="brand-dd-item" data-name="' + esc(it.name) + '">' +
          '<span class="brand-dd-name">' + esc(it.name) + '</span>' + sub + '</div>';
      }).join('');
      dd.style.display = 'block';
    }
    function close() { dd.style.display = 'none'; activeIdx = -1; }
    function itemsEls() { return dd.querySelectorAll('.brand-dd-item'); }
    function setActive(i) {
      var els = itemsEls();
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
    function update() { Promise.resolve(opts.getMatches(input.value)).then(render); }

    input.addEventListener('focus', update);
    input.addEventListener('input', update);
    input.addEventListener('blur', function () { setTimeout(close, 150); }); // タップ確定を待つ
    input.addEventListener('keydown', function (e) {
      if (dd.style.display !== 'block') return;
      if (e.key === 'ArrowDown') { e.preventDefault(); setActive(activeIdx + 1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(activeIdx - 1); }
      else if (e.key === 'Enter' && activeIdx >= 0) {
        e.preventDefault(); e.stopPropagation();
        pick(itemsEls()[activeIdx].getAttribute('data-name'));
      } else if (e.key === 'Escape') { close(); }
    }, true); // capture: 既存のEnter→次フィールド処理より先に候補確定を優先
    dd.addEventListener('mousedown', function (e) {
      var it = e.target.closest ? e.target.closest('.brand-dd-item') : null;
      if (!it) return;
      e.preventDefault(); // blur を防いで確定
      pick(it.getAttribute('data-name'));
    });
  }

  // ── メーカー名 ──
  window.attachBrandAutocomplete = function (input, opts) {
    opts = opts || {};
    var cats = opts.cats || null;
    var brands = [];
    loadBrands().then(function (list) {
      brands = cats
        ? list.filter(function (b) {
            return (b.categories || []).some(function (c) { return cats.indexOf(c) !== -1; });
          })
        : list;
    });
    attachAutocomplete(input, {
      onPick: opts.onPick,
      getMatches: function (q) {
        q = norm(q).trim();
        if (!brands.length) return [];
        var pool = !q ? brands.slice(0, 60)
          : rank(brands, q, function (b) { return [b.name].concat(b.aliases || []); }, norm).slice(0, 60);
        return pool.map(function (b) {
          return { name: b.name, sub: (b.aliases && b.aliases.length) ? b.aliases.join(' / ') : '' };
        });
      }
    });
  };

  // ── 型番 ──
  window.attachModelAutocomplete = function (input, opts) {
    opts = opts || {};
    var cats = opts.cats || null;
    var makerInput = opts.makerInput || null;
    var brandsList = [], modelsMap = {};
    loadBrands().then(function (l) { brandsList = l; });
    loadModels().then(function (m) { modelsMap = m; });

    function resolveBrand(v) {
      v = norm(v).trim();
      if (!v) return null;
      for (var i = 0; i < brandsList.length; i++) {
        var b = brandsList[i];
        if (norm(b.name) === v) return b.name;
        if ((b.aliases || []).some(function (a) { return norm(a) === v; })) return b.name;
      }
      return null;
    }

    attachAutocomplete(input, {
      onPick: opts.onPick,
      getMatches: function (q) {
        var brand = resolveBrand(makerInput ? makerInput.value : '');
        if (!brand || !modelsMap[brand]) return [];
        var catmap = modelsMap[brand];
        var pool = [];
        Object.keys(catmap).forEach(function (cat) {
          if (cats && cats.indexOf(cat) === -1) return;
          (catmap[cat] || []).forEach(function (mod) {
            if (pool.indexOf(mod) === -1) pool.push(mod);
          });
        });
        if (!pool.length) return [];
        var nq = normModel(q);
        var out = !nq ? pool.slice(0, 60)
          : rank(pool, nq, function (m) { return [m]; }, normModel).slice(0, 60);
        return out.map(function (m) { return { name: m }; });
      }
    });
  };
})();
