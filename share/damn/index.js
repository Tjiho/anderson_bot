'use strict';

var auth = require('./auth');
var Damn = require('./damn');

module.exports = {
  clientCredentials: function clientCredentials(clientId, clientSecret) {
    var clientCredentials = new auth.ClientCredentials(clientId, clientSecret);

    return clientCredentials.getToken().then(function (token) {
      return new Damn(token);
    });
  },

  implicit: function implicit(clientId, redirectUri, username, password, scope) {
    var implicit = new auth.Implicit(clientId, redirectUri);

    return implicit.getToken(username, password, scope).then(function (token) {
      return new Damn(token);
    });
  }
};