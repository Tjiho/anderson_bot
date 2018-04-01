'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var debug = require('debug')('damn:auth:implicit');
var uuid = require('uuid');
var AuthenticationStrategy = require('./base');

var Implicit = function (_AuthenticationStrate) {
  _inherits(Implicit, _AuthenticationStrate);

  function Implicit(clientId, redirectUri) {
    _classCallCheck(this, Implicit);

    var _this = _possibleConstructorReturn(this, (Implicit.__proto__ || Object.getPrototypeOf(Implicit)).call(this, 'https://www.deviantart.com/'));

    _this.clientId = clientId;
    _this.redirectUri = redirectUri;
    return _this;
  }

  _createClass(Implicit, [{
    key: 'getCSRF',
    value: function getCSRF() {
      return this.client.get('users/rockedout').then(function (body) {
        var validateToken = /name="validate_token" value="([0-9a-f]+)"/.exec(body)[1];
        var validateKey = /name="validate_key" value="([0-9a-f]+)"/.exec(body)[1];

        return {
          validateKey,
          validateToken
        };
      });
    }
  }, {
    key: 'login',
    value: function login(username, password) {
      var _this2 = this;

      return this.getCSRF().then(function (csrf) {
        return _this2.client._request({
          form: {
            username,
            password,
            validate_token: csrf.validateToken,
            validate_key: csrf.validateKey
          },
          method: 'POST',
          url: 'https://www.deviantart.com/users/login'
        });
      });
    }
  }, {
    key: 'authorize',
    value: function authorize(scope) {
      var state = uuid.v4();

      return this.client._request({
        followRedirect: false,
        method: 'GET',
        qs: {
          response_type: 'token',
          client_id: this.clientId,
          redirect_uri: this.redirectUri,
          state,
          scope
        },
        url: 'https://www.deviantart.com/oauth2/authorize'
      }).then(function (response) {
        var location = response.headers.location;

        var returnedState = /state=([0-9a-f-]+)&?/.exec(location)[1];
        var accessToken = /access_token=([0-9a-f]+)&?/.exec(location)[1];

        if (returnedState !== state) throw Error('States do not match');

        return accessToken;
      });
    }
  }, {
    key: 'getToken',
    value: function getToken(username, password) {
      var _this3 = this;

      var scope = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'basic';

      return this.login(username, password).then(function () {
        return _this3.authorize(scope);
      }).then(function (token) {
        debug(`Authentication successful (clientId: ${_this3.clientId}, user: ${username})`);
        return token;
      });
    }
  }]);

  return Implicit;
}(AuthenticationStrategy);

module.exports = Implicit;