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

