const Calendar = {
  currentYear: 0,
  currentMonth: 0,
  startDate: null,
  endDate: null,
  mode: 'range',       // 'range' = 왕복, 'single' = 편도/다구간
  activeInput: null,

  init() {
    const today = new Date();
    this.currentYear = today.getFullYear();
    this.currentMonth = today.getMonth();

    document.getElementById('calClose').addEventListener('click', () => this.close());
    document.getElementById('calPrev').addEventListener('click', () => this.prev());
    document.getElementById('calNext').addEventListener('click', () => this.next());
    document.getElementById('calConfirm').addEventListener('click', () => this.confirm());

    // 배경 클릭 시 닫기
    document.getElementById('calOverlay').addEventListener('click', (e) => {
      if (e.target.id === 'calOverlay') this.close();
    });

    // 왕복 날짜 필드 클릭
    document.querySelector('.d1').addEventListener('click', () => {
      this.open(document.getElementById('date1'), 'range');
    });

    // 편도 날짜 필드 클릭
    document.querySelector('.d2').addEventListener('click', () => {
      this.open(document.getElementById('date2'), 'single');
    });

    // 다구간 날짜 필드 클릭
    document.querySelector('#tabs-3 .date-field').addEventListener('click', () => {
      this.open(document.getElementById('date3'), 'single');
    });
  },

  open(inputEl, mode) {
    this.activeInput = inputEl;
    this.mode = mode;
    this.startDate = null;
    this.endDate = null;

    const today = new Date();
    this.currentYear = today.getFullYear();
    this.currentMonth = today.getMonth();

    this.render();
    document.getElementById('calOverlay').classList.add('open');
  },

  close() {
    document.getElementById('calOverlay').classList.remove('open');
  },

  prev() {
    this.currentMonth--;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.render();
  },

  next() {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.render();
  },

  // 두 달 렌더링
  render() {
    let y2 = this.currentYear;
    let m2 = this.currentMonth + 1;
    if (m2 > 11) { m2 = 0; y2++; }

    this.renderMonth(this.currentYear, this.currentMonth, document.getElementById('calMonth1'));
    this.renderMonth(y2, m2, document.getElementById('calMonth2'));
  },

  // 한 달치 캘린더 그리기
  renderMonth(year, month, container) {
    const monthNames = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];
    const dayNames = ['일','월','화','수','목','금','토'];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const firstDay = new Date(year, month, 1).getDay();   // 첫 날 요일 (0=일)
    const lastDay = new Date(year, month + 1, 0).getDate(); // 마지막 날짜

    let html = `<div class="cal-month-title">${year}. ${monthNames[month]}</div>`;

    // 요일 헤더
    html += `<div class="cal-day-names">`;
    dayNames.forEach(d => { html += `<div class="cal-day-name">${d}</div>`; });
    html += `</div>`;

    // 날짜 칸
    html += `<div class="cal-dates">`;

    // 첫 날 이전 빈 칸
    for (let i = 0; i < firstDay; i++) {
      html += `<div class="cal-date empty"></div>`;
    }

    for (let d = 1; d <= lastDay; d++) {
      const date = new Date(year, month, d);
      date.setHours(0, 0, 0, 0);

      const isPast = date < today;
      const isStart = this.startDate && date.getTime() === this.startDate.getTime();
      const isEnd   = this.endDate   && date.getTime() === this.endDate.getTime();
      const inRange = this.startDate && this.endDate
                      && date > this.startDate && date < this.endDate;
      const isOnly  = isStart && !this.endDate;  // 출발일만 선택된 상태

      let cls = 'cal-date';
      if (isPast)    cls += ' past';
      if (isOnly)    cls += ' selected-only';
      if (isStart && this.endDate) cls += ' range-start';
      if (isEnd)     cls += ' range-end';
      if (inRange)   cls += ' in-range';

      const data = isPast ? '' : `data-year="${year}" data-month="${month}" data-day="${d}"`;
      html += `<div class="${cls}" ${data}><span class="cal-date-num">${d}</span></div>`;
    }

    html += `</div>`;
    container.innerHTML = html;

    // 날짜 클릭 이벤트
    container.querySelectorAll('.cal-date:not(.past):not(.empty)').forEach(el => {
      el.addEventListener('click', () => {
        this.handleClick(
          parseInt(el.dataset.year),
          parseInt(el.dataset.month),
          parseInt(el.dataset.day)
        );
      });
    });
  },

  handleClick(year, month, day) {
    const clicked = new Date(year, month, day);
    clicked.setHours(0, 0, 0, 0);

    // 편도/다구간: 날짜 하나만 선택
    if (this.mode === 'single') {
      this.startDate = clicked;
      this.endDate = null;
      this.render();
      return;
    }

    // 왕복: 출발일 → 귀국일 순서로 선택
    if (!this.startDate || (this.startDate && this.endDate)) {
      // 처음 선택이거나, 이미 둘 다 선택된 상태면 다시 시작
      this.startDate = clicked;
      this.endDate = null;
    } else {
      // 출발일만 선택된 상태
      if (clicked <= this.startDate) {
        // 출발일보다 앞이면 출발일을 새로 설정
        this.startDate = clicked;
      } else {
        this.endDate = clicked;
      }
    }
    this.render();
  },

  formatDate(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  },

  confirm() {
    if (!this.startDate) return;

    if (this.mode === 'range' && this.endDate) {
      this.activeInput.value = `${this.formatDate(this.startDate)} ~ ${this.formatDate(this.endDate)}`;
    } else {
      this.activeInput.value = this.formatDate(this.startDate);
    }

    this.close();
  }
};

Calendar.init();

/* 인원수 업다운 */
document.querySelectorAll('.passenger-field').forEach(function(field) {
  var countEl = field.querySelector('.pax-count');
  var count = 1;

  field.querySelector('.pax-up').addEventListener('click', function() {
    if (count < 10) { count++; countEl.textContent = count; }
  });

  field.querySelector('.pax-down').addEventListener('click', function() {
    if (count > 1) { count--; countEl.textContent = count; }
  });
});
