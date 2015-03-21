var topics = require('models/topics');
var competencies = require('models/competencies');

var Skill = Parse.Object.extend({
  className: 'Skill',
  defaults: {
    topic: null,
    competency: null,
    user: null
  }
});

var Skills = Parse.Collection.extend({
  model: Skill,
  getTopic: function () {
    return topics;
  },
  getCompetency: function () {
    return competencies;
  }
});

module.exports = new Skills;
