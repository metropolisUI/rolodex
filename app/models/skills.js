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

  instance: function (data) {
    return new Skill(data);
  }
});

module.exports = new Skills;
