var application = require('application');

var TopicView = require('views/topicView');

module.exports = Backbone.Router.extend({
  routes: {
    '': 'home',
    'topic': 'topic'
  },

  home: function () {
    this.render(application.homeView.render());
  },

  topic: function () {
    this.render(new TopicView());
  },



  render: function (view) {
    $('#ui-view').html(view.$el);
    return this;
  }

});
