var application = require('application');

var TopicView = require('views/topicView');
var SignupView = require('views/signupView');

module.exports = Backbone.Router.extend({
  routes: {
    '': 'home',
    'topic': 'topic',
    'register': 'register'
  },

  home: function () {
    this.render(application.homeView.render());
  },

  topic: function () {
    this.render(new TopicView());
  },

  register: function () {
    this.render(new SignupView());
  },


  // Common functions
  render: function (view) {
    $('#ui-view').html(view.$el);
    return this;
  }

});
