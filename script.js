const slider = document.querySelector(".slider");
const parents = document.querySelector(".parents");
const children = document.querySelector(".children");
const grandChildren = document.querySelector(".grand-children");
const openNav = document.querySelector(".open-nav");
const openChild = document.querySelector(".open-child");
const openGrandChild = document.querySelector(".open-grand-child");
const goBacks = document.querySelectorAll(".go-back");
let hideChildren = false;
let descendant = "";

let tl = gsap.timeline({ defaults: { duration: 1 } });

openNav.addEventListener("click", function () {
  tl.set(slider, { display: "block" }).to(slider, { x: "100%" });
});

function transitioner(show, hide) {}

openChild.addEventListener("click", function () {
  if (!tl.isActive()) {
    descendant = parents;
    tl.set(children, { display: "block" }).to([parents, children], {
      x: "100%",
      onComplete: function () {
        parents.style.display = "none";
      },
    });
  }
});

openGrandChild.addEventListener("click", function () {
  if (!tl.isActive()) {
    descendant = children;
    hideChildren = true;
    tl.set(grandChildren, { display: "block" }).to([children, grandChildren], {
      x: "+=100%",
      onComplete: function () {
        children.style.display = "none";
      },
    });
  }
});

goBacks.forEach(function (goBack) {
  goBack.addEventListener("click", function () {
    if (!tl.isActive()) {
      descendant.style.display = "block";
      if (descendant == parents) {
        tl.to([this.parentElement, descendant], {
          x: 0,
          onComplete: () => {
            this.parentElement.style.display = "none";
          },
        });
      } else if (descendant == children) {
        tl.to([this.parentElement, descendant], {
          x: "-=100%",
          onComplete: () => {
            this.parentElement.style.display = "none";
            descendant = parents;
          },
        });
      }
    }
  });
});
