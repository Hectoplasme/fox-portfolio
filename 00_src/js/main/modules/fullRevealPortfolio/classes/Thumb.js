import utils from "../../../../libs/utils.js";
import anime from "animejs";
import GridItem from "./GridItem.js";

class Thumb extends GridItem {
  constructor(el) {
    super(el);
    this.thumb = true;
  }
}

module.exports = Thumb;
