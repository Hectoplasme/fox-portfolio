const anime = require("animejs");
const utils = require("../../../../libs/utils.js");

class Panel {
  constructor(el, container) {
    this.DOM = { el: el };
    this.DOM.container = container;
    this.DOM.logo = this.DOM.container.querySelector(".js-logo");
    this.DOM.icon = this.DOM.logo.querySelector(".js-icon");
    this.DOM.enter = container.querySelector(".js-enter");
    this.animatableElems = Array.from(
      this.DOM.container.querySelectorAll(".js-animatable")
    ).sort(() => 0.5 - Math.random());

    //set layout
    this.boxRect = this.DOM.el.getBoundingClientRect();
    this.layout();

    this.isOpen = true;
    this.initEvents();
  }

  layout() {
    this.DOM.el.style.transform = `scaleX(${utils.winsize.width /
      this.boxRect.width}) scaleY(${utils.winsize.height /
      this.boxRect.height})`;
    document.body.classList.remove("is-loading");
  }

  initEvents() {
    this.onResize = () => {
      utils.winsize = { width: window.innerWidth, height: window.innerHeight };
      if (this.isOpen) {
        this.layout();
      }
    };
    window.addEventListener(
      "resize",
      utils.debounce(() => this.onResize(), 10)
    );
  }

  open() {
    if (this.isOpen || this.isAnimating) return;
    this.isOpen = true;
    this.isAnimating = true;

    //First reset pointer events
    this.DOM.container.style.pointerEvents = "auto";
    this.DOM.logo.style.pointerEvents = "none";

    //Remove the icon from the animation targets
    anime.remove(this.DOM.icon);
    //To set other settings
    anime({
      targets: this.DOM.icon,
      translateY: [
        { value: "-400%", duration: 200, easing: "easeOutQuad" }
        // { value: ["200%", "0%"], duration: 700, easing: "easeOutExpo" }
      ],
      opacity: [
        {
          value: 0,
          duration: 300,
          // delay: 500,
          easing: "linear"
        }
      ]
    });

    anime.remove(this.animatableElems);
    anime({
      targets: this.animatableElems,
      duration: 1200,
      delay: (t, i) => 350 + i * 30,
      easing: "easeOutExpo",
      translateX: "0%",
      opacity: {
        value: 1,
        easing: "linear",
        duration: 400
      }
    });

    const boxRect = this.DOM.el.getBoundingClientRect();
    anime.remove(this.DOM.el);
    anime({
      targets: this.DOM.el,
      scaleX: {
        value: utils.winsize.width / boxRect.width,
        duration: 700,
        delay: 300,
        easing: "easeOutExpo"
      },
      scaleY: {
        value: utils.winsize.height / boxRect.height,
        duration: 300,
        easing: "easeOutQuad"
      },
      complete: () => (this.isAnimating = false)
    });
  }

  close() {
    if (!this.isOpen || this.isAnimating) return;
    this.isOpen = false;
    this.isAnimating = true;

    //First remove pointer events
    this.DOM.container.style.pointerEvents = "none";
    this.DOM.logo.style.pointerEvents = "auto";

    //Remove the icon from the animation targets
    anime.remove(this.DOM.icon);
    //To set other settings
    anime({
      targets: this.DOM.icon,
      translateY: [
        { value: "-400%", duration: 300, delay: 300, easing: "easeOutQuad" },
        {
          value: ["200%", "0%"],
          duration: 700,
          delay: 300,
          easing: "easeOutExpo"
        }
      ],
      rotate: [
        { value: 0, duration: 800 },
        { value: [90, 0], duration: 1400, easing: "easeOutElastic" }
      ],
      opacity: [
        {
          value: [0, 1],
          duration: 900,
          delay: 500,
          easing: "linear"
        }
      ]
    });

    //Same with animatable elements
    anime.remove(this.animatableElems);
    anime({
      targets: this.animatableElems,
      duration: 150,
      easing: "easeOutQuad",
      translateX: "-30%",
      opacity: 0
    });

    //Same with the panel
    anime.remove(this.DOM.el);
    anime({
      targets: this.DOM.el,
      duration: 1000,
      delay: 400,
      scaleX: { value: 1, duration: 300, easing: "easeOutQuad" },
      scaleY: { value: 1, duration: 700, delay: 700, easing: "easeOutExpo" },
      complete: () => (this.isAnimating = false)
    });
  }
}

module.exports = Panel;
