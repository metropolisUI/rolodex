var app = require('application');
var View = require('./view');
var template = require('./templates/skills');
var topics = require('models/topics');
var skills = require('models/skills');
var competencies = require('models/competencies');

module.exports = View.extend({
  id: 'skills-view',
  template: template,

  initialize: function () {
    // WARNING: Automatically adding skills to current logged in user
    this.data.user = Parse.User.current();

    topics.availableForUser(this.data.user).then(function (topics) {
      this.data.competencies = competencies.toJSON();
      this.data.topicsCollection = topics;
      this.data.topics = topics.toJSON();
      this.render();
    }.bind(this));
  },

  onSubmit: function (e) {
    e.preventDefault();

    var topic = this.data.topicsCollection.get(this.$topicInput.val());

    var skill = skills.instance({});
    skill.set('topic', topic);
    skill.set('competency', this.$competencyInput.val());
    skill.set('user', this.data.user);
    skill.save();

    this.data.alert = 'Skill Saved!';
    // Remove latest added skill from dropdown
    this.data.topics = this.data.topics.filter(function (model) {
      return model.objectId !== topic.id;
    });
    this.render();
  },

  afterRender: function () {
    this.$topicInput = this.$('#topic');
    this.$topicInput.material_select();
    this.$competencyInput = this.$('#competency');
    this.$competencyInput.material_select();
    this.$form = this.$('form');
    this.$form.on('submit', function (e) {
      this.onSubmit(e);
    }.bind(this));

    // Clear alert after save
    this.data.alert = null;
  }

});
