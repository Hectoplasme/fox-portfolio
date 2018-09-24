// // IE Specifics
require("es5-shim");
require("es6-shim");

const titleHeader = require("./modules/titleHeader/titleHeader");
const fullRevealPortfolio = require("./modules/fullRevealPortfolio/fullRevealPortfolio");
import smoothscroll from "smoothscroll-polyfill";

(function() {
  // kick off the polyfill!
  smoothscroll.polyfill();
  // console.log(titleHeader);
  if (document.querySelector(".js-header")) titleHeader.init();
  if (document.querySelector(".js-portfolio")) fullRevealPortfolio.init();
})();
