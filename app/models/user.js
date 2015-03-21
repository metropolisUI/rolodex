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

  all: function () {
    var query = new Parse.Query(Parse.User);
    return query.find().then(function (users) {
      return new Parse.Collection(users);
    });
  }
};

module.exports = User;
