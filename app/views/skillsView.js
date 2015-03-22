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
    var promises = [];

    promises.push(topics.fetch().then(function (topics) {
      this.data.topics = topics.toJSON();
    }.bind(this)));

    this.data.competencies = competencies.toJSON();

    Parse.Promise.when(promises).then(function () {
      this.render();
    }.bind(this));
  },

  onSubmit: function (e) {
    e.preventDefault();

    var topic = topics.get(this.$topicInput.val());

    var skill = skills.instance({});
    skill.set('topic', topic);
    skill.set('competency', this.$competencyInput.val());
    skill.set('user', Parse.User.current());
    skill.save();

    debugger;

    this.data.alert = 'Skill Saved!';
    this.render();
  },

  afterRender: function () {
    this.$topicInput = this.$el.find('#topic');
    this.$topicInput.material_select();
    this.$competencyInput = this.$el.find('#competency');
    this.$competencyInput.material_select();
    this.$form = this.$el.find('form');
    this.$form.on('submit', function (e) {
      this.onSubmit(e);
    }.bind(this));

    // Clear alert after save
    this.data.alert = null;
  }

});
