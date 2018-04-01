'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var debug = require('debug')('damn:auth:cc');
var AuthenticationStrategy = require('./base');

var ClientCredentials = function (_AuthenticationStrate) {
  _inherits(ClientCredentials, _AuthenticationStrate);

  function ClientCredentials(clientId, clientSecret) {
    _classCallCheck(this, ClientCredentials);

    var _this = _possibleConstructorReturn(this, (ClientCredentials.__proto__ || Object.getPrototypeOf(ClientCredentials)).call(this, 'https://www.deviantart.com/'));

    _this.clientId = clientId;
    _this.clientSecret = clientSecret;
    return _this;
  }

  _createClass(ClientCredentials, [{
    key: 'getToken',
    value: function getToken() {
      var _this2 = this;

      var qs = {
        grant_type: 'client_credentials',
        client_id: this.clientId,
        client_secret: this.clientSecret
      };

      return this.client.get('oauth2/token', qs).then(function (data) {
        return data.access_token;
      }).then(function (token) {
        debug(`Authentication successful (clientId: ${_this2.clientId})`);
        return token;
      });
    }
  }]);

  return ClientCredentials;
}(AuthenticationStrategy);

module.exports = ClientCredentials;