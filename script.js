const slider = document.querySelector(".slider");
// const parents = document.querySelector(".parents");
// const children = document.querySelector(".children");
// const grandChildren = document.querySelector(".grand-children");
const openNav = document.querySelector(".open-nav");
const openChild = document.querySelector(".open-child");
const openGrandChild = document.querySelector(".open-grand-child");

let tl = gsap.timeline({ defaults: { duration: 0.5, ease: "power4.out" } });

openNav.addEventListener("click", function () {
  tl.set(slider, { display: "block" }).to(slider, { xPercent: 100 });
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
