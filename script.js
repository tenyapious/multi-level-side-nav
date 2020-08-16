const slider = document.querySelector(".slider");
const parents = document.querySelector(".parents");
const children = document.querySelector(".children");
const grandChildren = document.querySelector(".grand-children");

const openNav = document.querySelector(".open-nav");
const openChild = document.querySelector(".open-child");
const openGrandChild = document.querySelector(".open-grand-child");

openNav.addEventListener("click", function () {
  slider.style.transform = "translateX(100%)";
});

openChild.addEventListener("click", function () {
  gsap.to(".parents", {
    duration: 0.5,
    ease: "power1.out",
    x: "100%",
    onComplete: function () {
      // parents.style.display = "none";
      alert("complete");
    },
    onStart: function () {
      // children.style.display = "block";
      alert("start");
    },
  });
});

openGrandChild.addEventListener("click", function () {
  gsap.to([parents, children], {
    duration: 0.1,
    ease: "power1.out",
    x: "100%",
    onStart: function () {
      children.style.display = "block";
    },
  });
});
