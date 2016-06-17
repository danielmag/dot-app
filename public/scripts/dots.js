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
    return 'rgb(' + r + ' ,' + g + ' ,' + b + ')';
  }

  return randomUtils;
})();

var RequestUtils = (function() {
  'use strict';

  var requestUtils = {};

  var request = new XMLHttpRequest();

  function objToData(obj) {
    return Object.keys(obj).reduce(
      function(a, k) {
        a.push(k + '=' + encodeURIComponent(obj[k]));
        return a
      }, []).join('&');
  }

  requestUtils.post = function(data) {
    request.open('POST', '//' + window.location.hostname + ':' + location.port +
      '/add-dot', true);
    request.setRequestHeader('Content-Type',
      'application/x-www-form-urlencoded; charset=UTF-8');
    request.send(objToData(data));
  }

  return requestUtils;
})();

(function() {
  'use strict';

  var canvas = document.getElementById("dot-canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var ctx = canvas.getContext("2d");

  function addDot(percentX, percentY, color, radius) {
    ctx.beginPath();
    var realCoordX = (percentX / 100) * window.innerWidth;
    var realCoordY = (percentY / 100) * window.innerHeight;
    ctx.fillRect(realCoordX, realCoordY, radius, radius);
    ctx.fillStyle = color;
  }

  var initialDots = JSON.parse(canvas.getAttribute("data-initial-dots"));
  initialDots.forEach(function(d) {
    var color = d.color || "rgb(0, 0, 0)";
    var radius = d.radius || 1;
    addDot(d.x, d.y, color, radius);
  });

  document.addEventListener('click', function(e) {
    var percentX = (e.pageX / window.innerWidth) * 100;
    var percentY = (e.pageY / window.innerHeight) * 100;
    var color = RandomUtils.colorRgb();
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
