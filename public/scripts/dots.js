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
  ctx.fillStyle = "#000000";

  function addDot(percentX, percentY) {
    var realCoordX = (percentX / 100) * window.innerWidth;
    var realCoordY = (percentY / 100) * window.innerHeight;
    ctx.fillRect( realCoordX, realCoordY, 1, 1 );
  }

  var initialDots = JSON.parse(canvas.getAttribute("data-initial-dots"));
  initialDots.forEach(function(d) {
    addDot(d.x, d.y);
  });

  document.addEventListener('click', function(e) {
    var percentX = (e.pageX / window.innerWidth) * 100;
    var percentY = (e.pageY / window.innerHeight) * 100;

    RequestUtils.post({
      x: percentX,
      y: percentY,
      color: color,
      radius: radius
    });

    addDot(percentX, percentY);
  });
})();
