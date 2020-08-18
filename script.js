const slider = document.querySelector(".nav");
// const parents = document.querySelector(".parents");
// const children = document.querySelector(".children");
// const grandChildren = document.querySelector(".grand-children");
const openNav = document.querySelector(".open-nav");
const openChild = document.querySelector(".open-child");
const openGrandChild = document.querySelector(".open-grand-child");
const containerDarkCover = document.querySelector(".container-dark-cover");

let viewPortWidth =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

console.log(viewPortWidth);
console.log(document.querySelector(".parents").clientWidth);

let tl = gsap.timeline({ defaults: { duration: 0.5, ease: "power1.out" } });

let openNavTl = tl
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

openChild.addEventListener("click", function () {
  transitioner(this.parentElement.nextElementSibling, this.parentElement);
});

openGrandChild.addEventListener("click", function () {
  transitioner(this.parentElement.nextElementSibling, this.parentElement);
});

gsap.utils.toArray(".go-back").forEach((goBack) => {
  goBack.addEventListener("click", function () {
    transitioner(
      this.parentElement.previousElementSibling,
      this.parentElement,
      "-=100"
    );
  });
});
