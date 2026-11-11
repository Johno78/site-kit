/* Gellings shared bar — VERSION 1
   One file for every landing page. Adds:
     - a top strip: Shop home, product search (goes to the gellings.im shop search), Login, Basket
     - a "Browse" menu linking all the landing pages to each other
     - a "More from Gellings" block above the page footer
   To use: add this ONE line just before </body> on each landing page:
     <script src="https://johno78.github.io/site-kit/gellings-bar.js" defer></script>
   To change the links on every page at once, edit the PAGES list below. */
(function () {
  if (window.__gellingsBar) return; window.__gellingsBar = true;

  var SHOP = 'https://www.gellings.im/';
  var SEARCH = 'https://www.gellings.im/prod_cat/search.asp';
  var LOGIN = 'https://shop.gellings.im/sp_frontend2/member_home.cgi?retailer_id=11400&no_guest=1';
  var BASKET = 'https://shop.gellings.im/sp_frontend2/basket.cgi?retailer_id=11400';
  var G = 'https://johno78.github.io/';

  // group, label, folder on johno78.github.io
  var PAGES = [
    ['By sector', 'Bars, Pubs & Restaurants', 'Bars-Pubs/'],
    ['By sector', 'Care Homes & Healthcare', 'care-healthcare/'],
    ['By sector', 'Catering & Kitchens', 'Catering-Kitchens/'],
    ['By sector', 'Hotels & Guest Accommodation', 'hotel-guest/'],
    ['By sector', 'Facilities & Cleaning Contractors', 'Facilities-Cleaning-Contractors/'],
    ['By product', 'Cleaning Chemicals', 'Clean-Chem/'],
    ['By product', 'Paper', 'paper/'],
    ['By product', 'Disposable Gloves', 'Gloves/'],
    ['By product', 'Food Packaging & Disposables', 'Food-packaging/'],
    ['By product', 'rPET Platters', 'Platters/'],
    ['By product', 'Cocktail & Bar Essentials', 'Cocktail/'],
    ['By product', 'Christmas 2026', 'Christmas-2026/'],
    ['Offers & info', 'Latest Offers', 'Latest/'],
    ['Offers & info', 'Offers & Savings', 'Offers-Savings/'],
    ['Offers & info', 'Delivery Days', 'delivery/'],
    ['Offers & info', 'Open a Trade Account', 'Trade/'],
    ['Offers & info', 'Safety Data Sheets', 'sds/'],
    ['Offers & info', 'News', 'latest-news/']
  ];

  var here = location.pathname.toLowerCase().replace(/index\.html$/, '');
  var isHere = function (f) { return here.indexOf('/' + f.toLowerCase()) === 0; };
  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); };

  var css = '' +
    '.gb,.gb *{box-sizing:border-box}' +
    '.gb{position:relative;z-index:9999;background:#1a2340;color:#fff;font:14px/1.3 Inter,Arial,Helvetica,sans-serif}' +
    '.gb-in{max-width:1200px;margin:0 auto;padding:8px 16px;display:flex;align-items:center;gap:10px;flex-wrap:wrap}' +
    '.gb a{color:#fff;text-decoration:none}' +
    '.gb-home{font-weight:700;white-space:nowrap}' +
    '.gb-home span{color:#c9a35c}' +
    '.gb form{flex:1 1 220px;display:flex;min-width:0}' +
    '.gb input{flex:1;min-width:0;border:0;border-radius:6px 0 0 6px;padding:8px 10px;font:inherit;color:#1a2340;background:#fff}' +
    '.gb button{border:0;cursor:pointer;font:inherit;font-weight:600}' +
    '.gb form button{background:#54b2ac;color:#10222b;border-radius:0 6px 6px 0;padding:8px 14px}' +
    '.gb-btn{background:transparent;color:#fff;border:1px solid rgba(255,255,255,.35)!important;border-radius:6px;padding:7px 12px;white-space:nowrap}' +
    '.gb-btn:hover,.gb-link:hover{border-color:#c9a35c!important;color:#c9a35c}' +
    '.gb-link{border:1px solid rgba(255,255,255,.35);border-radius:6px;padding:7px 12px;white-space:nowrap}' +
    '.gb-basket{background:#c9a35c;color:#1a2340!important;border-color:#c9a35c;font-weight:700}' +
    '.gb-basket:hover{color:#1a2340!important;background:#d8b777}' +
    '.gb-menu{display:none;background:#222d52;border-top:1px solid rgba(255,255,255,.12)}' +
    '.gb-menu.open{display:block}' +
    '.gb-cols{max-width:1200px;margin:0 auto;padding:14px 16px 18px;display:grid;grid-template-columns:repeat(3,1fr);gap:18px}' +
    '.gb-cols h4{margin:0 0 8px;font:700 12px/1 Inter,Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#c9a35c}' +
    '.gb-cols a{display:block;padding:5px 0}' +
    '.gb-cols a:hover{color:#54b2ac}' +
    '.gb-cols a.on{color:#54b2ac;font-weight:700}' +
    '.gb-more{background:#f4f1ea;color:#1a2340;font:15px/1.4 Inter,Arial,Helvetica,sans-serif;padding:28px 16px}' +
    '.gb-more-in{max-width:1200px;margin:0 auto}' +
    '.gb-more h3{margin:0 0 12px;font:700 18px/1.2 Fraunces,Georgia,serif;color:#1a2340}' +
    '.gb-chips{display:flex;flex-wrap:wrap;gap:8px}' +
    '.gb-chips a{background:#fff;border:1px solid #d9d3c4;border-radius:999px;padding:7px 14px;color:#1a2340;text-decoration:none}' +
    '.gb-chips a:hover{border-color:#54b2ac;color:#2b7f7a}' +
    '@media(max-width:700px){.gb-cols{grid-template-columns:1fr;gap:12px}.gb form{order:5;flex-basis:100%}.gb-in{gap:8px}}' +
    '@media print{.gb,.gb-more{display:none}}';

  var groups = {};
  PAGES.forEach(function (p) { (groups[p[0]] = groups[p[0]] || []).push(p); });
  var cols = Object.keys(groups).map(function (g) {
    return '<div><h4>' + esc(g) + '</h4>' + groups[g].map(function (p) {
      return '<a href="' + G + p[2] + '"' + (isHere(p[2]) ? ' class="on" aria-current="page"' : '') + '>' + esc(p[1]) + '</a>';
    }).join('') + '</div>';
  }).join('');

  var bar = document.createElement('div');
  bar.className = 'gb';
  bar.innerHTML =
    '<div class="gb-in">' +
      '<a class="gb-home" href="' + SHOP + '">Gellings <span>Shop</span></a>' +
      '<button type="button" class="gb-btn" aria-expanded="false" aria-controls="gb-menu">Browse &#9662;</button>' +
      '<form action="' + SEARCH + '" method="get" role="search">' +
        '<input type="search" name="search_text" placeholder="Search products or codes" aria-label="Search products" required>' +
        '<button type="submit" name="submit" value="Submit">Search</button>' +
      '</form>' +
      '<a class="gb-link" href="' + LOGIN + '">Login</a>' +
      '<a class="gb-link gb-basket" href="' + BASKET + '">Basket</a>' +
    '</div>' +
    '<nav class="gb-menu" id="gb-menu" aria-label="Gellings pages"><div class="gb-cols">' + cols + '</div></nav>';

  var more = document.createElement('div');
  more.className = 'gb-more';
  more.innerHTML = '<div class="gb-more-in"><h3>More from Gellings</h3><div class="gb-chips">' +
    '<a href="' + SHOP + '">Shop all products</a>' +
    PAGES.filter(function (p) { return !isHere(p[2]); }).map(function (p) {
      return '<a href="' + G + p[2] + '">' + esc(p[1]) + '</a>';
    }).join('') + '</div></div>';

  function mount() {
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    document.body.insertBefore(bar, document.body.firstChild);
    var foot = document.querySelector('body > footer') || document.querySelector('footer');
    if (foot && foot.parentNode) foot.parentNode.insertBefore(more, foot); else document.body.appendChild(more);
    var btn = bar.querySelector('.gb-btn'), menu = bar.querySelector('.gb-menu');
    btn.addEventListener('click', function () {
      var open = menu.classList.toggle('open'); btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) { menu.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); btn.focus(); }
    });
  }
  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);
})();
