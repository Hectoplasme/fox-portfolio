// // IE Specifics
require("es5-shim");
require("es6-shim");

const titleHeader = require("./modules/titleHeader/titleHeader");
const fullRevealPortfolio = require("./modules/fullRevealPortfolio/fullRevealPortfolio");
import smoothscroll from "smoothscroll-polyfill";
import imagesLoaded from "imagesloaded";

(function() {
  // kick off the smoothscroll polyfill!
  smoothscroll.polyfill();

  // Preload all the images in the page..
  imagesLoaded(
    document.querySelectorAll([".fullview__item", ".grid__item-bg"]),
    { background: true },
    () => {
      document.querySelector(".js-enter").innerHTML = "Entrez";
      document.body.classList.remove("loading");
    }
  );

  // console.log(titleHeader);
  if (document.querySelector(".js-header")) titleHeader.init();
  if (document.querySelector(".js-portfolio")) fullRevealPortfolio.init();
})();
