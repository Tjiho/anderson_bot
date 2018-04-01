'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var debug = require('debug')('damn:client');
var request = require('request');

var BASE_URL = 'https://www.deviantart.com/api/v1/oauth2/';
var USER_AGENT = 'dAmn';

var HttpClient = function () {
  function HttpClient(accessToken) {
    var baseUrl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : BASE_URL;

    _classCallCheck(this, HttpClient);

    this.accessToken = accessToken;
    this.baseUrl = baseUrl;

    this.jar = request.jar();
  }

  _createClass(HttpClient, [{
    key: 'parseBody',
    value: function parseBody(response) {
      var contentType = response.headers['content-type'];
      var body = response.body;

      if (contentType.includes('application/json')) {
        return JSON.parse(body);
      }

      return body;
    }
  }, {
    key: 'sendRequest',
    value: function sendRequest(options) {
      return new Promise(function (resolve, reject) {
        request(options, function (err, response) {
          if (err) return reject(err);
          return resolve(response);
        });
      });
    }
  }, {
    key: 'request',
    value: function request(method, path) {
      var qs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var body = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var headers = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

      var url = `${this.baseUrl}${path}`;
      debug(url);
      var jar = this.jar;

      Object.assign(headers, { Accept: 'application/json', 'User-Agent': USER_AGENT });

      if (this.accessToken) {
        Object.assign(qs, { access_token: this.accessToken });
      }

      return this.sendRequest({
        body,
        headers,
        jar,
        method,
        qs,
        url
      });
    }
  }, {
    key: 'get',
    value: function get(url, qs) {
      return this.request('GET', url, qs).then(this.parseBody);
    }
  }, {
    key: 'post',
    value: function post(url, body) {
      return this.request('POST', url, {}, body, {
        'Content-type': 'application/json'
      }).then(this.parseBody);
    }
  }]);

  return HttpClient;
}();

module.exports = HttpClient;