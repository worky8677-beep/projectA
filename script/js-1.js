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

// /* ================================================ */
// /* ==nav========================================= */
// /* ================================================ */

// const nav = document.querySelector(".nav");
// const dep1 = document.querySelectorAll(".dep1");

// dep1.forEach((el) => {
//   const mega = el.querySelector(".mega");
//   el.addEventListener(
//     "mouseenter",
//     function () {
//       //el.classList.add("on");
//       mega.style.height = "auto";
//     },
//     false,
//   );
//   el.addEventListener("mouseleave", function () {
//     //el.classList.remove("on");
//     mega.style.height = `0px`;
//   });
// });
