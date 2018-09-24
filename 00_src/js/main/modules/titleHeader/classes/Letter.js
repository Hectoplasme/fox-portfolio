import utils from "../../../../libs/utils.js";

//Classes
import Shape from "./Shape";

class Letter {
  constructor(el, svg, options) {
    this.DOM = {};
    this.DOM.el = el;
    this.DOM.svg = svg;
    this.options = {
      totalShapes: 10
    };
    Object.assign(this.options, options);
    this.rect = this.DOM.el.getBoundingClientRect();
    this.totalShapes = this.options.totalShapes;
    this.init();
    this.initEvents();
  }
  init() {
    this.shapes = [];
    for (let i = 0; i <= this.totalShapes - 1; ++i) {
      const shape = new Shape("random", this.rect, this.options);
      this.shapes.push(shape);
      this.DOM.svg.appendChild(shape.DOM.el);
    }
  }
  initEvents() {
    window.addEventListener(
      "resize",
      utils.debounce(() => {
        this.rect = this.DOM.el.getBoundingClientRect();
        for (let i = 0; i <= this.totalShapes - 1; ++i) {
          const shape = this.shapes[i];
          shape.onResize(this.rect);
        }
      }, 20)
    );
  }
}

module.exports = Letter;
