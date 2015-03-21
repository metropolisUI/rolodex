var View = require('./view');
var template = require('./templates/home');
var topics = require('models/topics');
var User = require('models/user');

module.exports = View.extend({
  id: 'home-view',
  template: template,

  initialize: function () {
    var promises = [];

    promises.push(topics.fetch().then(function (results) {
      this.data.topics = results.toJSON();
    }.bind(this)));

    promises.push(User.all().then(function (users) {
      this.data.users = users.toJSON();
    }.bind(this)));

    Parse.Promise.when(promises).then(function () {
      this.render();
    }.bind(this));
  }

});
