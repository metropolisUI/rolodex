var app = require('application');
var View = require('./view');
var template = require('./templates/topic');
var topics = require('models/topics');

module.exports = View.extend({
  id: 'topic-view',
  template: template,

  initialize: function () {
    topics.fetch({
      success: function (results) {
        this.data.topics = results.toJSON();

        this.render();
      }.bind(this)
    });
  },

  onSubmit: function (e) {
    var topic = topics.instance({
      name: this.$topicInput.val()
    });

    topic.save();
    e.preventDefault();
    this.data.alert = 'Topic Saved!';
    this.render();
  },

  afterRender: function () {
    this.$topicInput = this.$el.find('#topic');
    this.$form = this.$el.find('form');
    this.$form.on('submit', function (e) {
      this.onSubmit(e);
    }.bind(this));

    // Clear alert after save
    this.data.alert = null;
  }

});
