import utils from "../../../../libs/utils.js";
import anime from "animejs";

class GridItem {
  constructor(el) {
    this.DOM = { el: el };
    this.DOM.inner = Array.from(this.DOM.el.children);
    this.thumb = false;
  }
  toggle(action) {
    this.DOM.inner.forEach(inner => {
      const speed = utils.randomBetween(800, 1000, 0);
      //animate translateY
      anime.remove(inner);
      anime({
        targets: inner,
        duration: speed,
        delay: 200,
        easing: "easeInOutQuint",
        translateY:
          action === "hide"
            ? this.thumb
              ? -1 * utils.winsize.height - 30
              : -1 * utils.winsize.height - 30 + inner.offsetHeight / 2
            : 0
      });
    });
  }
}

module.exports = GridItem;
