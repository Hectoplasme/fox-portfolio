import charming from "charming";
import anime from "animejs";
import utils from "../../../../libs/utils.js";

//Classes
import Letter from "./Letter";

class Word {
  constructor(el, options) {
    this.DOM = {};
    this.DOM.el = el;
    this.options = {
      shapesOnTop: false
    };
    Object.assign(this.options, options);
    this.init();
    this.initEvents();
  }
  init() {
    this.createSVG();
    charming(this.DOM.el);
    this.letters = [];
    Array.from(this.DOM.el.querySelectorAll("span")).forEach(letter =>
      this.letters.push(new Letter(letter, this.DOM.svg, this.options))
    );
  }
  initEvents() {
    window.addEventListener(
      "resize",
      utils.debounce(() => {
        utils.winsize = {
          width: window.innerWidth,
          height: window.innerHeight
        };
        this.DOM.svg.setAttribute("width", `${utils.winsize.width}px`);
        this.DOM.svg.setAttribute("height", `${utils.winsize.height}px`);
        this.DOM.svg.setAttribute(
          "viewbox",
          `0 0 ${utils.winsize.width} ${utils.winsize.height}`
        );
      }, 20)
    );
  }
  createSVG() {
    this.DOM.svg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    this.DOM.svg.setAttribute("class", "shapes");
    this.DOM.svg.setAttribute("width", `${utils.winsize.width}px`);
    this.DOM.svg.setAttribute("height", `${utils.winsize.height}px`);
    this.DOM.svg.setAttribute(
      "viewbox",
      `0 0 ${utils.winsize.width} ${utils.winsize.height}`
    );
    if (this.options.shapesOnTop) {
      this.DOM.el.parentNode.insertBefore(
        this.DOM.svg,
        this.DOM.el.nextSibling
      );
    } else {
      this.DOM.el.parentNode.insertBefore(this.DOM.svg, this.DOM.el);
    }
  }
  show(config) {
    return this.toggle("show", config);
  }
  hide(config) {
    return this.toggle("hide", config);
  }
  toggle(action = "show", config) {
    return new Promise((resolve, reject) => {
      const toggleNow = () => {
        for (let i = 0, len = this.letters.length; i <= len - 1; ++i) {
          this.letters[i].DOM.el.style.opacity = action === "show" ? 1 : 0;
        }
        resolve();
      };

      if (config && Object.keys(config).length !== 0) {
        if (config.shapesAnimationOpts) {
          for (let i = 0, len = this.letters.length; i <= len - 1; ++i) {
            const letter = this.letters[i];
            setTimeout(
              (function(letter) {
                return () => {
                  config.shapesAnimationOpts.targets = letter.shapes.map(
                    shape => shape.DOM.el
                  );
                  anime.remove(config.shapesAnimationOpts.targets);
                  anime(config.shapesAnimationOpts);
                };
              })(letter),
              config.lettersAnimationOpts && config.lettersAnimationOpts.delay
                ? config.lettersAnimationOpts.delay(letter.DOM.el, i)
                : 0
            );
          }
        }
        if (config.lettersAnimationOpts) {
          config.lettersAnimationOpts.targets = this.letters.map(
            letter => letter.DOM.el
          );
          config.lettersAnimationOpts.complete = () => {
            if (action === "hide") {
              for (
                let i = 0, len = config.lettersAnimationOpts.targets.length;
                i <= len - 1;
                ++i
              ) {
                config.lettersAnimationOpts.targets[i].style.transform = "none";
              }
            }
            resolve();
          };
          anime(config.lettersAnimationOpts);
        } else {
          toggleNow();
        }
      } else {
        toggleNow();
      }
    });
  }
}

module.exports = Word;
