/* 취항지 데이터 */
var airportData = {
  '대한민국': [
    { name: '청주', code: 'CJJ' },
    { name: '서울/인천', code: 'ICN' }
  ],
  '일본': [
    { name: '도쿄(나리타)', code: 'NRT' },
    { name: '오사카', code: 'KIX' },
    { name: '나고야', code: 'NGO' },
    { name: '오키나와', code: 'OKA' },
    { name: '삿포로', code: 'CTS' },
    { name: '후쿠오카', code: 'FUK' },
    { name: '이바라키', code: 'IBR' },
    { name: '기타큐슈', code: 'KKJ' },
    { name: '히로시마', code: 'HIJ' }
  ],
  '동북아시아': [
    { name: '타이베이', code: 'TPE' },
    { name: '타이중', code: 'RMQ' },
    { name: '청다오', code: 'TAO' },
    { name: '지난', code: 'TNA' },
    { name: '화롄', code: 'HUN' }
  ],
  '동남아시아': [
    { name: '다낭', code: 'DAD' },
    { name: '나트랑', code: 'CXR' },
    { name: '클락', code: 'CRK' },
    { name: '세부', code: 'CEB' }
  ],
  '몽골': [
    { name: '올란바토르', code: 'ULN' }
  ]
};

var RouteSelector = {
  activeInput: null,
  currentCat: '대한민국',

  init: function() {
    document.getElementById('routePopupClose').addEventListener('click', function() {
      RouteSelector.close();
    });

    document.getElementById('routeOverlay').addEventListener('click', function(e) {
      if (e.target.id === 'routeOverlay') RouteSelector.close();
    });

    // 모든 탭의 출발지/도착지 필드에 클릭 이벤트 연결
    document.querySelectorAll('.route-input').forEach(function(input) {
      input.addEventListener('click', function() {
        var isDepart = input.placeholder === '출발지';
        document.getElementById('routePopupTitle').textContent = isDepart ? '출발지 선택' : '도착지 선택';
        RouteSelector.open(input);
      });
    });
  },

  open: function(inputEl) {
    this.activeInput = inputEl;
    this.currentCat = '대한민국';
    this.renderCategories();
    this.renderAirports('대한민국');
    document.getElementById('routeOverlay').classList.add('open');
  },

  close: function() {
    document.getElementById('routeOverlay').classList.remove('open');
  },

  renderCategories: function() {
    var container = document.getElementById('routeCategories');
    var html = '';
    Object.keys(airportData).forEach(function(cat) {
      var isActive = cat === RouteSelector.currentCat ? ' active' : '';
      html += '<div class="route-cat-item' + isActive + '" data-cat="' + cat + '">' + cat + '</div>';
    });
    container.innerHTML = html;

    container.querySelectorAll('.route-cat-item').forEach(function(el) {
      el.addEventListener('click', function() {
        var cat = el.dataset.cat;
        RouteSelector.currentCat = cat;
        container.querySelectorAll('.route-cat-item').forEach(function(i) { i.classList.remove('active'); });
        el.classList.add('active');
        RouteSelector.renderAirports(cat);
      });
    });
  },

  renderAirports: function(cat) {
    var container = document.getElementById('routeAirports');
    var list = airportData[cat];
    var html = '';
    list.forEach(function(airport) {
      html += '<div class="route-airport-item" data-name="' + airport.name + '" data-code="' + airport.code + '">';
      html += airport.name + '<span class="route-airport-code">' + airport.code + '</span>';
      html += '</div>';
    });
    container.innerHTML = html;

    container.querySelectorAll('.route-airport-item').forEach(function(el) {
      el.addEventListener('click', function() {
        RouteSelector.activeInput.value = el.dataset.name + ' ' + el.dataset.code;
        RouteSelector.close();
      });
    });
  }
};

RouteSelector.init();
