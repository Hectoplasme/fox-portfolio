// // IE Specifics
require("es5-shim");
require("es6-shim");

const titleHeader = require("./modules/titleHeader/titleHeader");
const fullRevealPortfolio = require("./modules/fullRevealPortfolio/fullRevealPortfolio");
import smoothscroll from "smoothscroll-polyfill";
import imagesLoaded from "imagesloaded";

(function() {
  //display safari template
  const ua = navigator.userAgent.toLowerCase();
  console.log(ua);
  if (!!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/)) {
    document.body.classList.remove("no-js");
    // kick off the smoothscroll polyfill!
    smoothscroll.polyfill();

    // Preload all the images in the page..
    imagesLoaded(
      document.querySelectorAll([".fullview__item", ".grid__item-bg"]),
      { background: true },
      () => {
        document.body.classList.add("no-js");
        // if (document.querySelector(".js-enter"))
        //   document.querySelector(".js-enter").innerHTML = "Entrez";
        // document.body.classList.remove("loading");

        // if (document.querySelector(".js-header")) titleHeader.init();
        // if (document.querySelector(".js-portfolio")) fullRevealPortfolio.init();
      }
    );
  } else {
    document.body.classList.remove("no-js");
    // kick off the smoothscroll polyfill!
    smoothscroll.polyfill();

    // Preload all the images in the page..
    imagesLoaded(
      document.querySelectorAll([".fullview__item", ".grid__item-bg"]),
      { background: true },
      () => {
        if (document.querySelector(".js-enter"))
          document.querySelector(".js-enter").innerHTML = "Entrez";
        document.body.classList.remove("loading");

        if (document.querySelector(".js-header")) titleHeader.init();
        if (document.querySelector(".js-portfolio")) fullRevealPortfolio.init();
      }
    );
  }

  // console.log(titleHeader);
})();
