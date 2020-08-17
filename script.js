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

openNav.addEventListener("click", function () {
  slider.style.display = "block";
  gsap.to(slider, {
    duration: 1,
    x: "100%",
  });
});

function transitioner(show, hide) {
  show.style.display = "block";
  hide.style.transform = "translateX(100%)";
  setTimeout(function () {
    show.style.transform = "translateX(100%)";
  });
}

openChild.addEventListener("click", function () {
  descendant = parents;
  children.style.display = "block";
  gsap.to([parents, children], {
    duration: 1,
    x: "100%",
    onComplete: function () {
      parents.style.display = "none";
    },
  });
});

openGrandChild.addEventListener("click", function () {
  descendant = children;
  hideChildren = true;
  grandChildren.style.display = "block";

  gsap.to(grandChildren, {
    duration: 1,
    x: "100%",
  });

  gsap.to(children, {
    duration: 1,
    x: "200%",
    onComplete: function () {
      children.style.display = "none";
    },
  });
});

goBacks.forEach(function (goBack) {
  goBack.addEventListener("click", function () {
    descendant.style.display = "block";
    // this.parentElement.style.transform = "translate(0)";
    // setTimeout(function () {
    //   if (descendant == parents) {
    //     descendant.style.transform = "translateX(0)";
    //   } else if (descendant == children) {
    //     descendant.style.transform = "translateX(100%)";
    //   }
    // });
    if (descendant == parents) {
      gsap.to([this.parentElement, descendant], {
        duration: 1,
        x: 0,
        onComplete: () => {
          this.parentElement.style.display = "none";
        },
      });
    } else if (descendant == children) {
      // descendant.style.transform = "translateX(100%)";
      gsap.to(this.parentElement, {
        duration: 1,
        x: "0%",
        onComplete: () => {
          this.parentElement.style.display = "none";
          descendant = parents;
        },
      });

      gsap.to(descendant, {
        duration: 1,
        x: "100%",
      });
    }
  });
});
