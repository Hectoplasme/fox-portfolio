import utils from "../../../../libs/utils.js";
import anime from "animejs";

class GridItem {
  constructor(el) {
    this.DOM = { el: el };
    this.DOM.inner = Array.from(this.DOM.el.children);
  }
  toggle(action) {
    this.DOM.inner.forEach(inner => {
      const speed = utils.randomBetween(800, 1000, 0);
      //@todo animate translateY
      anime.remove(inner);
      anime({
        targets: inner,
        duration: speed,
        delay: 200,
        easing: "easeInOutQuint",
        translateY:
          action === "hide"
            ? this.constructor.name === "Thumb"
              ? -1 * utils.winsize.height - 30
              : -1 * utils.winsize.height - 30 + inner.offsetHeight / 2
            : 0
      });

      // @todo scale the "back" box as it moves.
      // if (this.constructor.name !== "Thumb") {
      //   anime.remove(inner);
      //   anime({
      //     targets: inner,
      //     duration: speed,
      //     delay: 0.2,
      //     easing: "easeInOutQuint",
      //     scaleY: {
      //       duration: speed / 2,
      //       delay: 0.2 + speed / 2,
      //       value: 1
      //     }
      //   });
      // }
    });

    // if (action === "hide") this.DOM.el.zIndex = 0;
  }
}

module.exports = GridItem;
