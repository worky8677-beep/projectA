$(function () {
  $("#date2").datepicker({
    buttonImage: "images/icon/date.png",
    dateFormat: "yy-mm-dd",
     showOn: "button",
     buttonImageOnly: true,
      buttonText: "Select date"
  });
    $(".date-field.d2").click(function () {
    $("#date2").datepicker("show");
  });

  $("#date1").datepicker({
    buttonImage: "images/icon/date.png",
    dateFormat: "yy-mm-dd",
     showOn: "button",
     buttonImageOnly: true,
      buttonText: "Select date"
  });
    $(".date-field.d1").click(function () {
    $("#date1").datepicker("show");
  });

  $("#date3").datepicker({
    buttonImage: "images/icon/date.png",
    dateFormat: "yy-mm-dd",
     showOn: "button",
     buttonImageOnly: true,
      buttonText: "Select date"
  });
    $(".date-field.d3").click(function () {
    $("#date3").datepicker("show");
  });
});


/* ==============탭============ */

const main_tabs = document.querySelectorAll(".tab-menu a");
const main_panels = document.querySelectorAll(".tab-content>div");

// 반복문
for (let i = 0; i < 3; i++) {
  main_tabs[i].addEventListener("click", function (e) {
    e.preventDefault();
    const currentScroll = window.scrollY;
    const a = main_tabs[i].getAttribute("href");
    for (let k = 0; k < 3; k++) {
      main_tabs[k].classList.remove("active");
      main_panels[k].classList.remove("active");
    }
    main_tabs[i].classList.add("active");
    document.querySelector(a).classList.add("active");

    window.scrollTo(0, currentScroll);
    return false;
  });
}

/* ==============팝업============ */
const btn = document.querySelector(".popup-dim button");
btn.onclick = () => {
  document.querySelector(".popup-dim").style.display = "none";
};
document.querySelector(".popup-dim").style.display = "none";

/* ================================================ */
/* ==네비========================================= */
/* ================================================ */

const nav = document.querySelector(".nav");
const dep1 = document.querySelectorAll(".dep1");

dep1.forEach((el) => {
  const mega = el.querySelector(".mega");
  el.addEventListener(
    "mouseenter",
    function () {
      const h = el.querySelector(".row").offsetHeight;
      el.classList.add("on");
      // mega.style.height = "auto";
      mega.style.height = `${h}px`;
    },
    false,
  );
  el.addEventListener("mouseleave", function () {
    el.classList.remove("on");
    mega.style.height = `0px`;
  });
});

/* ============상단 배너 스와이퍼============ */
var swiper = new Swiper(".mySwiper", {
  spaceBetween: 0,
  centeredSlides: true,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

/* ============최저가 항공권 슬라이드============ */
    var swiper = new Swiper(".price-list", {
     slidesPerView: 4,
      navigation: {
        nextEl: ".price-slider .slider-next",
        prevEl: ".price-slider .slider-prev",
      },
    });


/* ============혜택 슬라이드============ */
    var swiper = new Swiper(".benefits-inner", {
      cssMode: true,
      spaceBetween:5,
           slidesPerView: 3,
      navigation: {
        nextEl: ".benefits-slider .slider-next",
        prevEl: ".benefits-slider .slider-prev",
      },
      pagination: {
        el: ".swiper-pagination",
      },
      mousewheel: true,
      keyboard: true,
    });
