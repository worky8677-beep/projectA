// 뉴스 배너 슬라이더
class NewsBanner {
    constructor() {
        this.container = document.querySelector('.news-content');
        this.items = document.querySelectorAll('.news-item');
        this.prevBtn = document.querySelector('.news-prev');
        this.nextBtn = document.querySelector('.news-next');
        this.closeBtn = document.querySelector('.news-close');
        this.indicator = document.querySelector('.news-indicator strong');
        this.currentIndex = 0;

        this.init();
    }

    init() {
        if (!this.container) return;

        this.prevBtn?.addEventListener('click', () => this.prev());
        this.nextBtn?.addEventListener('click', () => this.next());
        this.closeBtn?.addEventListener('click', () => this.close());
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
        this.update();
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.items.length;
        this.update();
    }

    update() {
        this.items.forEach((item, index) => {
            item.classList.toggle('active', index === this.currentIndex);
        });
        if (this.indicator) {
            this.indicator.textContent = this.currentIndex + 1;
        }
    }

    close() {
        const banner = document.querySelector('.news-banner');
        if (banner) {
            banner.style.display = 'none';
        }
    }
}

// 메인 배너 슬라이더
class MainBanner {
    constructor() {
        this.currentIndex = 1; // 2/4로 시작
        this.totalSlides = 4;
        this.indicator = document.querySelector('.banner-indicator strong');
        this.prevBtn = document.querySelector('.banner-btn-prev');
        this.nextBtn = document.querySelector('.banner-btn-next');
        this.pauseBtn = document.querySelector('.banner-btn-pause');
        this.isPlaying = true;
        this.interval = null;

        this.init();
    }

    init() {
        if (!this.indicator) return;

        this.prevBtn?.addEventListener('click', () => this.prev());
        this.nextBtn?.addEventListener('click', () => this.next());
        this.pauseBtn?.addEventListener('click', () => this.togglePlay());

        this.startAutoPlay();
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
        this.update();
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
        this.update();
    }

    update() {
        if (this.indicator) {
            this.indicator.textContent = this.currentIndex + 1;
        }
    }

    togglePlay() {
        this.isPlaying = !this.isPlaying;
        if (this.isPlaying) {
            this.startAutoPlay();
        } else {
            this.stopAutoPlay();
        }
    }

    startAutoPlay() {
        this.interval = setInterval(() => this.next(), 5000);
    }

    stopAutoPlay() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
}

// 예약 탭
class BookingTabs {
    constructor() {
        this.tabs = document.querySelectorAll('.booking-tab');
        this.init();
    }

    init() {
        this.tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => this.switchTab(index));
        });
    }

    switchTab(index) {
        this.tabs.forEach((tab, i) => {
            tab.classList.toggle('active', i === index);
        });
    }
}

// 여행 타입 선택
class TripType {
    constructor() {
        this.types = document.querySelectorAll('.trip-type-item');
        this.init();
    }

    init() {
        this.types.forEach((type, index) => {
            type.addEventListener('click', () => this.select(index));
        });
    }

    select(index) {
        this.types.forEach((type, i) => {
            type.classList.toggle('active', i === index);
        });
    }
}

// 혜택 슬라이더
class BenefitsSlider {
    constructor() {
        this.track = document.querySelector('.benefits-track');
        this.prevBtn = document.querySelector('.benefits-slider .slider-prev');
        this.nextBtn = document.querySelector('.benefits-slider .slider-next');
        this.dots = document.querySelectorAll('.benefits-slider .dot');
        this.currentIndex = 0;
        this.cardWidth = 330; // 320px + 10px gap

        this.init();
    }

    init() {
        if (!this.track) return;

        this.prevBtn?.addEventListener('click', () => this.prev());
        this.nextBtn?.addEventListener('click', () => this.next());
    }

    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.update();
        }
    }

    next() {
        const maxIndex = this.dots.length - 1;
        if (this.currentIndex < maxIndex) {
            this.currentIndex++;
            this.update();
        }
    }

    update() {
        const offset = -this.currentIndex * this.cardWidth;
        this.track.style.transform = `translateX(${offset}px)`;

        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }
}

// 가격 슬라이더
class PriceSlider {
    constructor() {
        this.track = document.querySelector('.price-track');
        this.prevBtn = document.querySelector('.price-slider .slider-prev');
        this.nextBtn = document.querySelector('.price-slider .slider-next');
        this.tabs = document.querySelectorAll('.filter-tab');
        this.currentIndex = 0;
        this.cardWidth = 256; // 240px + 16px gap

        this.init();
    }

    init() {
        if (!this.track) return;

        this.prevBtn?.addEventListener('click', () => this.prev());
        this.nextBtn?.addEventListener('click', () => this.next());

        this.tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => this.switchTab(index));
        });
    }

    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.update();
        }
    }

    next() {
        const cards = this.track.querySelectorAll('.price-card');
        const maxIndex = Math.max(0, cards.length - 4); // 한 번에 4개 표시
        if (this.currentIndex < maxIndex) {
            this.currentIndex++;
            this.update();
        }
    }

    update() {
        const offset = -this.currentIndex * this.cardWidth;
        this.track.style.transform = `translateX(${offset}px)`;
    }

    switchTab(index) {
        this.tabs.forEach((tab, i) => {
            tab.classList.toggle('active', i === index);
        });
        this.currentIndex = 0;
        this.update();
    }
}

// 플로팅 버튼
class FloatingButtons {
    constructor() {
        this.toggle = document.querySelector('.floating-toggle');
        this.items = document.querySelector('.floating-items');
        this.isOpen = false;

        this.init();
    }

    init() {
        if (!this.toggle) return;

        this.toggle.addEventListener('click', () => this.toggleMenu());
        this.items.style.display = 'none';
    }

    toggleMenu() {
        this.isOpen = !this.isOpen;
        this.toggle.classList.toggle('active', this.isOpen);

        if (this.isOpen) {
            this.items.style.display = 'flex';
            setTimeout(() => {
                this.items.style.opacity = '1';
                this.items.style.transform = 'translateY(0)';
            }, 10);
        } else {
            this.items.style.opacity = '0';
            this.items.style.transform = 'translateY(20px)';
            setTimeout(() => {
                this.items.style.display = 'none';
            }, 300);
        }
    }
}

// 검색 버튼 활성화
class SearchButton {
    constructor() {
        this.btn = document.querySelector('.search-btn');
        this.departureInput = document.querySelector('.route-input');
        this.arrivalInput = document.querySelector('.route-input.right');

        this.init();
    }

    init() {
        if (!this.btn) return;

        [this.departureInput, this.arrivalInput].forEach(input => {
            input?.addEventListener('input', () => this.checkInputs());
        });
    }

    checkInputs() {
        const departure = this.departureInput?.value.trim();
        const arrival = this.arrivalInput?.value.trim();

        if (departure && arrival) {
            this.btn.classList.remove('disabled');
            this.btn.style.background = '#002554';
        } else {
            this.btn.classList.add('disabled');
            this.btn.style.background = '#aaa';
        }
    }
}

// 스크롤 헤더
class ScrollHeader {
    constructor() {
        this.header = document.querySelector('.header');
        this.lastScroll = 0;

        this.init();
    }

    init() {
        if (!this.header) return;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                this.header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                this.header.style.boxShadow = 'none';
            }

            this.lastScroll = currentScroll;
        });
    }
}

// 부드러운 스크롤
function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    new NewsBanner();
    new MainBanner();
    new BookingTabs();
    new TripType();
    new BenefitsSlider();
    new PriceSlider();
    new FloatingButtons();
    new SearchButton();
    new ScrollHeader();
    smoothScroll();

    console.log('제주항공 웹사이트가 로드되었습니다.');
});

// 윈도우 리사이즈 처리
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // 슬라이더 재조정
        const benefitsSlider = new BenefitsSlider();
        const priceSlider = new PriceSlider();
    }, 250);
});
/* ==============팝업============ */ 
const btn = document.querySelector('.popup-dim button');
btn.onclick=()=>{
document.querySelector('.popup-dim').style.display="none";
}