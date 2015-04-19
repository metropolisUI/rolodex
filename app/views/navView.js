var app = require('application');
var View = require('./view');
var template = require('./templates/nav');
var User = require('models/user');

module.exports = View.extend({
  id: 'nav-view',
  template: template,

  initialize: function () {
    Backbone.Mediator.sub('change:user', function () {
      var user = Parse.User.current();

      if (user) {
        user = user.toJSON();
      }

      this.data.user = user;
      this.render();
    }.bind(this));

    Backbone.Mediator.pub('change:user');
  }

});
