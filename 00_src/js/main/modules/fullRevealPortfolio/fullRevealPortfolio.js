import utils from "../../../libs/utils.js";
import Grid from "./classes/Grid";
import GridItem from "./classes/GridItem";
import Thumb from "./classes/Thumb";
import anime from "animejs";

const fullRevealPortfolio = {
  init() {
    console.log("pouet ça marche");
    this.bindUI();
    this.setProperties();
    this.bindEvents();
  },

  bindUI() {
    this.DOM = {};

    this.DOM.header = document.querySelector(".js-header");
    this.DOM.grid = document.querySelector(".grid--thumbs");
    this.DOM.thumbs = Array.from(this.DOM.grid.querySelectorAll(".grid__item"));
    // the colorful revealer element/panel that appears behind the images when showing/hiding a project
    this.DOM.revealer = document.querySelector(".revealer");
    // the fullview container and its items
    this.DOM.fullview = document.querySelector(".fullview");
    this.DOM.fullviewItems = this.DOM.fullview.querySelectorAll(
      ".fullview__item"
    );
    this.DOM.back = document.querySelector(".grid__toggle");
    this.DOM.presentation = document.querySelector(
      ".grid--outer .presentation"
    );
  },

  setProperties() {
    this.thumbs = [];
    this.DOM.thumbs.forEach(thumb => this.thumbs.push(new Thumb(thumb)));

    // all the elements that are going to move up/down (thumbs + back button (@todo))
    this.movable = [...this.thumbs];

    // current thumb/project index
    this.current = -1;

    // this.grid = new Grid(this.DOM.grid);
  },

  bindEvents() {
    // clicking a thumb will trigger the animation (show the project).
    this.DOM.thumbs.forEach((thumb, pos) => {
      thumb.addEventListener("click", e => {
        if (
          e.target != document.querySelector(".grid__toggle__inner") &&
          e.target != document.querySelector(".grid__toggle__text") &&
          e.target != document.querySelector(".grid__toggle")
        ) {
          this.current = pos;
          this.showProject();
        }
      });
    });

    this.DOM.back.addEventListener("click", () => {
      if (!this.isGridHidden) return;
      this.hideProject();
    });

    // when resizing the window we need to reset the grid items translation positions (if the fullview is shown).
    window.addEventListener(
      "resize",
      utils.debounce(() => {
        this.onResize();
      }, 20)
    );
  },

  showProject() {
    this.toggleProject("show");
  },
  hideProject() {
    this.toggleProject("hide");
  },
  toggleProject(action) {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.isGridHidden = action === "show";
    utils.allowTilt = !this.isGridHidden;

    if (this.isGridHidden) this.DOM.presentation.style.zIndex = 0;
    this.showRevealer().then(() => {
      this.DOM.fullviewItems[this.current].style.opacity = this.isGridHidden
        ? 1
        : 0;
      this.DOM.fullviewItems[this.current].style.zIndex = this.isGridHidden
        ? 100
        : 0;

      this.DOM.fullview.style.opacity = this.isGridHidden ? 1 : 0;
      this.DOM.fullview.style.pointerEvents = this.isGridHidden
        ? "auto"
        : "none";
      this.DOM.grid.style.pointerEvents = !this.isGridHidden ? "auto" : "none";
      this.hideRevealer(this.isGridHidden ? "up" : "down").then(() => {
        if (!this.isGridHidden) this.DOM.presentation.style.zIndex = 101;
      });
      this.DOM.header.style.zIndex = this.isGridHidden ? 0 : 101;
      this.isAnimating = false;
    });
    this.movable.forEach(item => {
      item.toggle(this.isGridHidden ? "hide" : "show");
      item.DOM.el.style.pointerEvents = this.isGridHidden ? "none" : "auto";
    });
  },
  showRevealer() {
    return this.toggleRevealer("show");
  },
  hideRevealer(dir) {
    return this.toggleRevealer("hide", dir);
  },
  toggleRevealer(action, dir) {
    return new Promise((resolve, reject) => {
      // change revealer color
      if (action === "show") {
        this.DOM.revealer.style.backgroundColor = this.movable[
          this.current
        ].DOM.el.dataset.revealer;
      }

      //Animate the revealer up or down
      anime({
        targets: this.DOM.revealer,
        duration: 600,
        easing: action === "show" ? "easeInQuint" : "easeOutQuint",
        translateY: action === "show" ? "-100%" : dir === "up" ? "-200%" : "0%",
        complete: resolve
      });
    });
  },
  onResize() {
    console.log("resiiiize");
    utils.winsize = { width: window.innerWidth, height: window.innerHeight };
    if (this.isGridHidden) {
      this.movable.forEach(item => {
        Array.from(item.DOM.el.children).forEach(child => {
          anime({
            targets: child,
            translateY:
              item.constructor.name === "Thumb"
                ? -1 * utils.winsize.height - 30
                : -1 * utils.winsize.height - 30 + child.offsetHeight / 2
          });
        });
      });
    }
  }
};

module.exports = fullRevealPortfolio;
