(function() {
  'use strict';

  var BACKGROUND_COLOR_RGB = [255, 255, 255];
  var BACKGROUND_COLOR_LAB = rgb2lab(BACKGROUND_COLOR_RGB);

  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;

  var canvas = document.getElementById("dot-canvas");
  canvas.width = windowWidth;
  canvas.height = windowHeight;

  var ctx = canvas.getContext("2d");

  function addDot(percentX, percentY, color, radius) {
    var realCoordX = (percentX / 100) * windowWidth;
    var realCoordY = (percentY / 100) * windowHeight;

    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(realCoordX, realCoordY, radius, 0, 2 * Math.PI);
    ctx.fill();
  }

  // get a color visually different enough from the background
  function getSuitableRandomColor(threshold) {
    var threshold = threshold || 10;
    var color = RandomUtils.colorRgb();
    while(deltaE(rgb2lab(color), BACKGROUND_COLOR_LAB) <= threshold) {
      color = RandomUtils.colorRgb();
    }
    return color;
  }

  function rgbArrayToString(rgbArray) {
    return 'rgb(' + rgbArray.join(', ') + ')';
  }

  var initialDots = JSON.parse(canvas.getAttribute("data-initial-dots"));
  initialDots.forEach(function(d) {
    var color = d.color || rgbArrayToString([0, 0, 0]);
    var radius = d.radius || 0.5;
    addDot(d.x, d.y, color, radius);
  });

  document.addEventListener('click', function(e) {
    var percentX = (e.pageX / windowWidth) * 100;
    var percentY = (e.pageY / windowHeight) * 100;
    var color = rgbArrayToString(getSuitableRandomColor());
    var radius = RandomUtils.integer(1, 15);

    RequestUtils.post({
      x: percentX,
      y: percentY,
      color: color,
      radius: radius
    });

    addDot(percentX, percentY, color, radius);
  });
})();
