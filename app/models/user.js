var app = require('application');

var User = {
  create: function (credentials, profileInfo) {
    var user = new Parse.User();

    if (profileInfo) {
      var key;
      for (key in profileInfo) {
        if (profileInfo.hasOwnProperty(key)) {
          user.set(key, profileInfo[key]);
        }
      }
    }

    // Override specific values
    user.set('username', credentials.email);
    user.set('email', credentials.email);
    user.set('password', credentials.password);

    user.signUp(null, {
      success: function(user) {
        app.router.navigate('', {trigger:true});
      },
      error: function(user, error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);
      }
    });
  },

  login: function (email, password) {
    return Parse.User.logIn(email, password, {
      success: function (user) {
        var app = require('application');

        Backbone.Mediator.pub('change:user');
        app.router.navigate('', {trigger:true});
      },
      error: function(user, error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);
      }
    });
  },

  logout: function () {
    var app = require('application');

    Parse.User.logOut();
    Backbone.Mediator.pub('change:user');
    app.router.navigate('', {trigger:true});
  },

  all: function () {
    var query = new Parse.Query(Parse.User);
    return query.find().then(function (users) {
      return new Parse.Collection(users);
    });
  },

  gravatarUrl: function (email, size) {
    return 'http://www.gravatar.com/avatar/' + md5(email) + '?d=retro' + (size ? '&s=' + size : '');
  }
};

module.exports = User;
