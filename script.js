const slider = document.querySelector(".nav");
const parentsContainer = document.querySelector(".parents");
const childrenContainer = document.querySelector(".children");
const grandChildrenContainer = document.querySelector(".grand-children");
const openNav = document.querySelector(".open-nav");
const openChild = document.querySelector(".child-link");
const openGrandChild = document.querySelector(".grand-child-link");
const containerDarkCover = document.querySelector(".container-dark-cover");

let childrensContainersChildToShow = "",
  grandchildrensContainersChildToShow = "",
  childrenContainerBool = false;

let viewPortHeight =
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight;

document.documentElement.style.setProperty("--vh", `${viewPortHeight}px`);

let tl = gsap.timeline({
  defaults: { duration: 0.5, ease: "power1.power1.inOut" },
});

let openNavTl = gsap
  .timeline({ defaults: { duration: 0.5, ease: "power1.inOut" } })
  .set([slider, containerDarkCover], { display: "block" })
  .set(".container", { height: viewPortHeight })
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
    tl.set(show, { display: "block" }).to([show[0], hide], {
      xPercent: direction,
      onComplete: function () {
        hide.style.display = "none";
        if (direction == "-=100") show[1].style.display = "none";
      },
    });
  }
}

gsap.utils.toArray(".child-link").forEach((childLink) => {
  childLink.addEventListener("click", function () {
    childrensContainersChildToShow = childrenContainer.querySelector(
      `[data-link="${this.parentElement.dataset.link}"]`
    );
    childrenContainerBool = true;
    transitioner(
      [childrenContainer, childrensContainersChildToShow],
      parentsContainer
    );
  });
});

gsap.utils.toArray(".grand-child-link").forEach((grandChildLink) => {
  grandChildLink.addEventListener("click", function () {
    grandchildrensContainersChildToShow = grandChildrenContainer.querySelector(
      `[data-link="${this.parentElement.dataset.link}"]`
    );
    childrenContainerBool = false;

    transitioner(
      [grandChildrenContainer, grandchildrensContainersChildToShow],
      childrenContainer
    );
  });
});

gsap.utils.toArray(".go-back").forEach((goBack) => {
  goBack.addEventListener("click", function () {
    if (childrenContainerBool)
      transitioner(
        [parentsContainer, childrensContainersChildToShow],
        childrenContainer,
        "-=100"
      );
    else
      transitioner(
        [childrenContainer, grandchildrensContainersChildToShow],
        grandChildrenContainer,
        "-=100"
      );
    childrenContainerBool = true;
  });
});
