const slider = document.querySelector(".nav");
// const parents = document.querySelector(".parents");
// const children = document.querySelector(".children");
// const grandChildren = document.querySelector(".grand-children");
const openNav = document.querySelector(".open-nav");
const openChild = document.querySelector(".child-link");
const openGrandChild = document.querySelector(".grand-child-link");
const containerDarkCover = document.querySelector(".container-dark-cover");

let viewPortWidth =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

let tl = gsap.timeline({
  defaults: { duration: 0.5, ease: "power1.power1.inOut" },
});

let openNavTl = gsap
  .timeline({ defaults: { duration: 0.5, ease: "power1.inOut" } })
  .set([slider, containerDarkCover], { display: "block" })
  .to(slider, { xPercent: 100 })
  .to(
    ".container-cover",
    {
      x: 300,
    },
    0
  );

openNavTl.pause();

openNav.addEventListener("click", function () {
  openNavTl.restart();
});

containerDarkCover.addEventListener("click", function () {
  openNavTl.reverse();
});

function transitioner(show, hide, direction = "+=100") {
  if (!tl.isActive()) {
    tl.set(show, { display: "block" }).to([show, hide], {
      xPercent: direction,
      onComplete: function () {
        hide.style.display = "none";
      },
    });
  }
}

gsap.utils.toArray(".child-link").forEach((childLink) => {
  childLink.addEventListener("click", function () {
    transitioner(
      this.closest(".parents").nextElementSibling,
      this.closest(".parents")
    );
  });
});

gsap.utils.toArray(".grand-child-link").forEach((grandChildLink) => {
  grandChildLink.addEventListener("click", function () {
    transitioner(
      this.closest(".children").nextElementSibling,
      this.closest(".children")
    );
  });
});

gsap.utils.toArray(".go-back").forEach((goBack) => {
  goBack.addEventListener("click", function () {
    let goBackParent;
    if (this.closest(".children")) goBackParent = this.closest(".children");
    else {
      goBackParent = this.closest(".grand-children");
    }
    transitioner(goBackParent.previousElementSibling, goBackParent, "-=100");
  });
});
