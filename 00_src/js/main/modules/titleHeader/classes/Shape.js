import utils from "../../../../libs/utils.js";

class Shape {
  constructor(type, letterRect, options) {
    this.DOM = {};
    this.options = {
      shapeTypes: ["circle", "rect", "polygon"],
      shapeColors: [
        "#e07272",
        "#0805b5",
        "#49c6ff",
        "#8bc34a",
        "#1e1e21",
        "#e24e81",
        "#e0cd24"
      ],
      shapeFill: true,
      shapeStrokeWidth: 1
    };
    Object.assign(this.options, options);
    this.type = type || this.options.shapeTypes[0];
    if (this.type !== "random" && !this.options.types.includes(this.type))
      return;
    if (this.type === "random")
      this.type = this.options.shapeTypes[
        utils.randomBetween(0, this.options.shapeTypes.length - 1, 0)
      ];
    this.letterRect = letterRect;
    this.init();
  }
  init() {
    this.DOM.el = document.createElementNS(
      "http://www.w3.org/2000/svg",
      this.type
    );
    this.DOM.el.style.opacity = 0;
    this.configureShapeType();

    if (this.options.shapeFill) {
      this.DOM.el.setAttribute(
        "fill",
        this.options.shapeColors[
          utils.randomBetween(0, this.options.shapeColors.length - 1, 0)
        ]
      );
    } else {
      this.DOM.el.setAttribute("fill", "none");
      this.DOM.el.setAttribute("stroke-width", this.options.shapeStrokeWidth);
      this.DOM.el.setAttribute(
        "stroke",
        this.options.shapeColors[
          utils.randomBetween(0, this.options.shapeColors.length - 1, 0)
        ]
      );
    }
  }
  configureShapeType() {
    this.DOM.el.style.transformOrigin = `${this.letterRect.left +
      this.letterRect.width / 2}px ${this.letterRect.top +
      this.letterRect.height / 2}px`;

    if (this.type === "circle") {
      const r = 0.5 * this.letterRect.width;
      this.DOM.el.setAttribute("r", r);
      this.DOM.el.setAttribute(
        "cx",
        this.letterRect.left + this.letterRect.width / 2
      );
      this.DOM.el.setAttribute(
        "cy",
        this.letterRect.top + this.letterRect.height / 2
      );
    } else if (this.type === "rect") {
      const w = utils.randomBetween(0.1, 0.5, 3) * this.letterRect.width;
      const h = utils.randomBetween(0.05, 0.4, 3) * this.letterRect.height;
      this.DOM.el.setAttribute("width", w);
      this.DOM.el.setAttribute("height", h);
      this.DOM.el.setAttribute(
        "x",
        this.letterRect.left + (this.letterRect.width - w) / 2
      );
      this.DOM.el.setAttribute(
        "y",
        this.letterRect.top + (this.letterRect.height - h) / 2
      );
    } else if (this.type === "polygon") {
      this.DOM.el.setAttribute(
        "points",
        `${this.letterRect.left} ${this.letterRect.top +
          this.letterRect.height}, ${this.letterRect.left +
          this.letterRect.width / 2} ${this.letterRect.bottom -
          this.letterRect.width}, ${this.letterRect.left +
          this.letterRect.width} ${this.letterRect.top +
          this.letterRect.height}`
      );
    }
  }
  onResize(letterRect) {
    this.letterRect = letterRect;
    this.configureShapeType();
  }
}

module.exports = Shape;
