const utils = {
  // From https://davidwalsh.name/javascript-debounce-function.
  debounce: (func, wait, immediate) => {
    var timeout;
    return function() {
      var context = this,
        args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  },

  // From http://snipplr.com/view/37687/random-number-float-generator/
  randomBetween: (minValue, maxValue, precision) => {
    if (typeof precision == "undefined") {
      precision = 2;
    }
    return parseFloat(
      Math.min(
        minValue + Math.random() * (maxValue - minValue),
        maxValue
      ).toFixed(precision)
    );
  },

  // from http://www.quirksmode.org/js/events_properties.html#position
  getMousePos: e => {
    let posx = 0;
    let posy = 0;
    if (!e) e = window.event;
    if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    } else if (e.clientX || e.clientY) {
      posx =
        e.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft;
      posy =
        e.clientY +
        document.body.scrollTop +
        document.documentElement.scrollTop;
    }
    return { x: posx, y: posy };
  },

  winsize: { width: window.innerWidth, height: window.innerHeight },

  allowTilt: true
};

module.exports = utils;
