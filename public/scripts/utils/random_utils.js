var RandomUtils = (function() {
  'use strict';

  var randomUtils = {};

  randomUtils.integer = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  randomUtils.colorRgb = function() {
    var r = this.integer(0, 255);
    var g = this.integer(0, 255);
    var b = this.integer(0, 255);
    return [r, g, b];
  }

  return randomUtils;
})();

