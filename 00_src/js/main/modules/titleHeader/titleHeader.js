import anime from "animejs";
import utils from "../../../libs/utils";
import Word from "./classes/Word";
import Panel from "./classes/Panel";

const titleHeader = {
  init() {
    this.bindUI();
    this.setProperties();
    this.bindEvents();
    this.startAnimation();
  },

  bindUI() {
    this.DOM = {};
    this.DOM.header = document.querySelector(".js-header");
    this.DOM.panel = this.DOM.header.querySelector(".js-panel");
    this.DOM.logo = this.DOM.header.querySelector(".js-logo");
    this.DOM.icon = this.DOM.logo.querySelector(".js-icon");
    this.DOM.enter = this.DOM.header.querySelector(".js-enter");
    this.DOM.title = Array.from(document.querySelectorAll(".js-header .word"));
  },

  setProperties() {
    this.panel = new Panel(this.DOM.panel, this.DOM.header);
    this.words = [];
  },

  bindEvents() {
    this.DOM.enter.addEventListener("click", ev => {
      ev.preventDefault();
      this.hide();
      this.panel.close();
    });
    this.DOM.logo.addEventListener("click", ev => {
      ev.preventDefault();
      const doc = document.documentElement;
      if ((window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0) === 0) {
        this.show();
        this.panel.open();
      } else {
        window.scroll({ top: 0, left: 0, behavior: "smooth" });
      }
    });
  },

  startAnimation() {
    this.DOM.title.forEach((word, pos) => {
      this.words.push(new Word(word, this.titleEffect.options));
    });
    this.show();
  },

  show() {
    this.words.forEach((word, pos) => {
      this.words[pos].show(this.titleEffect.show).then(() => {
        if (pos === this.DOM.title.length - 1) {
          this.DOM.header.classList.remove("is-loading");
        }
      });
    });
  },

  hide() {
    this.words.forEach((word, pos) => {
      this.words[pos].hide(this.titleEffect.hide).then(() => {
        if (pos === 0) {
          this.DOM.header.classList.add("is-loading");
        }
      });
    });
  },

  titleEffect: {
    options: {
      shapeColors: [
        "#35c394",
        "#9985ee",
        "#e81147",
        "#4718f5",
        "#ffcf00",
        "#35c394",
        "#9985ee",
        "#4718f5",
        "#ffcf00"
      ],
      totalShapes: 1,
      shapeTypes: ["rect"]
    },
    hide: {
      lettersAnimationOpts: {
        duration: 300,
        delay: (t, i) => i * 40,
        easing: "easeOutExpo",
        opacity: {
          value: 0,
          duration: 100,
          delay: (t, i) => i * 4,
          easing: "linear"
        },
        translateY: ["0%", "100%"]
      },
      shapesAnimationOpts: {
        duration: 250,
        delay: (t, i) => i * 20,
        easing: "easeOutExpo",
        translateX: () => [0, anime.random(-200, 200)],
        translateY: () => [0, anime.random(-200, 200)],
        scale: () => [
          utils.randomBetween(0.1, 0.2),
          utils.randomBetween(0.2, 0.4)
        ],
        rotate: () => [0, anime.random(-16, 16)],
        opacity: [
          { value: 1, duration: 1, easing: "linear", delay: (t, i) => i * 20 },
          { value: 0, duration: 300, delay: 120, easing: "easeOutQuad" }
        ]
      }
    },
    show: {
      lettersAnimationOpts: {
        duration: () => anime.random(800, 900),
        delay: (t, i) => i * 25 + 200,
        easing: "easeInOutElastic",
        opacity: [0, 1],
        translateY: ["100%", "0%"]
      },
      shapesAnimationOpts: {
        duration: () => anime.random(500, 1500),
        delay: (t, i) => i * 30 + 300,
        easing: "easeOutQuint",
        translateX: () => [anime.random(-15, 15), anime.random(-150, 150)],
        translateY: () => [anime.random(-15, 15), anime.random(-250, 250)],
        scale: () => [0, Math.random() + 5],
        opacity: [
          {
            value: 0.85,
            duration: 1,
            delay: (t, i) => i * 30 + 300
          }
        ]
      }
    }
  }
};

module.exports = titleHeader;
