'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HttpClient = require('./client');

var Damn = function () {
  function Damn(accessToken) {
    _classCallCheck(this, Damn);

    this.client = new HttpClient(accessToken);
  }

  _createClass(Damn, [{
    key: 'getDailyDeviations',
    value: function getDailyDeviations(qs) {
      return this.client.get('browse/dailydeviations', Object.assign({}, qs)).then(function (data) {
        return data.results;
      });
    }
  }, {
    key: 'getHotDeviations',
    value: function getHotDeviations(qs) {
      return this.client.get('browse/hot', Object.assign({}, qs)).then(function (data) {
        return data.results;
      });
    }
  }, {
    key: 'getDeviation',
    value: function getDeviation(deviationId, qs) {
      return this.client.get(`deviation/${deviationId}`, Object.assign({}, qs));
    }
  }, {
    key: 'getNotifications',
    value: function getNotifications(qs) {
      return this.client.get('feed/notifications', Object.assign({}, qs)).then(function (data) {
        return data.items;
      });
    }
  }, {
    key: 'getWatchFeed',
    value: function getWatchFeed(qs) {
      return this.client.get('feed/home', Object.assign({}, qs)).then(function (data) {
        return data.items;
      });
    }
  }, {
    key: 'placebo',
    value: function placebo() {
      return this.client.get('placebo');
    }
  }, {
    key: 'checkAccessToken',
    value: function checkAccessToken() {
      return this.placebo().then(function (data) {
        return data.status === 'success';
      });
    }
  }, {
    key: 'galleryAll',
    value: function galleryAll(username, qs) {
      return this.client.get('gallery/all', Object.assign({ username }, qs)).then(function (data) {
        return data.results;
      });
    }
  }, {
    key: 'userProfile',
    value: function userProfile(username, qs) {
      return this.client.get('user/profile/' + username, Object.assign({}, qs)).then(function (data) {
        return data;
      });
    }
  }, {
    key: 'galleryFolders',
    value: function galleryFolders(username, qs) {
      return this.client.get('gallery/folders', Object.assign({ username }, qs)).then(function (data) {
        return data.results;
      });
    }
  }, {
    key: 'galleryFolder',
    value: function galleryFolder(folderId, username, qs) {
      return this.client.get(`gallery/${folderId}`, Object.assign({ username }, qs)).then(function (data) {
        return data.results;
      });
    }
  }, {
    key: 'userFriends',
    value: function userFriends(username, qs) {
      return this.client.get(`user/friends/${username}`, Object.assign({}, qs)).then(function (data) {
        return data.results || Promise.reject(data);
      });
    }
  }, {
    key: 'userFriendsSearch',
    value: function userFriendsSearch(username, query) {
      return this.client.get(`user/friends/search`, { username, query }).then(function (data) {
        return data.results || Promise.reject(data.error);
      });
    }
  }]);

  return Damn;
}();

module.exports = Damn;