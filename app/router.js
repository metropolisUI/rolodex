var application = require('application');
var User = require('models/user');

var HomeView = require('views/homeView');
var TopicView = require('views/topicView');
var SignupView = require('views/signupView');
var LoginView = require('views/loginView');
var ProfileView = require('views/profileView');
var SkillsView = require('views/skillsView');

module.exports = Backbone.Router.extend({
  routes: {
    '': 'home',
    'topic': 'topic',
    'register': 'register',
    'login': 'login',
    'logout': 'logout',
    'profile/:id': 'profile',
    'skills': 'skills',
  },

  home: function () {
    this.render(new HomeView());
  },

  topic: function () {
    this.render(new TopicView());
  },

  register: function () {
    this.render(new SignupView());
  },

  login: function () {
    this.render(new LoginView());
  },

  logout: function () {
    User.logout();
  },

  profile: function () {
	this.render(new ProfileView({userId: id}));
  },

  skills: function () {
    this.render(new SkillsView());
  },


  // Common functions
  render: function (view) {
    $('#ui-view').html(view.$el);
    return this;
  }

});
