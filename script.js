const container = document.querySelector(".container");
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
  childrenContainerBool = false,
  viewPortHeight = window.innerHeight;
navOpenedBool = false;

document.documentElement.style.setProperty("--vh", `${viewPortHeight}px`);

// /////////////////////////////////

function reportWindowSize() {
  viewPortHeight = window.innerHeight;
  document.documentElement.style.setProperty("--vh", `${viewPortHeight}px`);
  if (navOpenedBool) container.style.height = viewPortHeight + "px";
  else {
    container.style.height = "100%";
  }
  // container.style.height = viewPortHeight;
  // console.log(viewPortHeight);
}

// jQuery(window).on("resize", _.debounce(reportWindowSize, 150));
// jQuery(window).on("resize", reportWindowSize);

window.onresize = _.debounce(reportWindowSize, 200, {
  leading: false,
  trailing: true,
});

// /////////////////////////////////

let tl = gsap.timeline({
  defaults: { duration: 0.5, ease: "power1.power1.inOut" },
});

let openNavTl = gsap
  .timeline({ defaults: { duration: 0.5, ease: "power1.inOut" } })
  .set([slider, containerDarkCover], { display: "block" })
  // .set(container, { height: viewPortHeight })
  .to(slider, { xPercent: 100 })
  .to(
    ".container-cover",
    {
      x: 300,
    },
    0
  );

// const containerReSize = gsap.quickSetter(container, "height", "px");

openNavTl.pause();

openNav.addEventListener("click", function () {
  navOpenedBool = true;
  container.style.height = viewPortHeight + "px";
  // containerReSize(viewPortHeight);
  openNavTl.restart();
});

containerDarkCover.addEventListener("click", function () {
  navOpenedBool = false;
  container.style.height = "100%";
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
