var competencies = require('models/competencies');

var Skill = Parse.Object.extend({
  className: 'Skill',
  defaults: {
    topic: null,
    competency: null,
    user: null
  },

  // Get a `new Competency()`
  getCompetency: function () {
    var comps = competencies.filter(function (model) {
      return model.get('abbr') === this.get('competency');
    }.bind(this));

    // Return first or null
    if (comps.length) {
      return comps[0];
    }
    else {
      return comps;
    }
  },

  // Backbone Problem: Have to manually convert subproperties to JSON correctly
  // Backbone Problem: Models with relational data are not easy to work with (Solution: Store?)
  toJSON: function () {
    var output = {};

    _.each(this.attributes, function (data, key) {
      var fnName = 'get' + key.charAt(0).toUpperCase() + key.slice(1);

      // Get expected format
      if (_.isFunction(this[fnName])) {
        data = this[fnName]();
      }

      // Convert to basic JSON
      if (_.isObject(data) && data._hasData) {
        output[key] = data.toJSON();
      }
      else {
        output[key] = data;
      }
    }.bind(this));

    return output;
  }

});

var Skills = Parse.Collection.extend({
  model: Skill,

  instance: function (data) {
    return new Skill(data);
  },

  forUser: function (user) {
    var query = new Parse.Query(Skill);
    return query.equalTo('user', user).include('topic').include('user').find().then(function (results) {
      return new Skills(results);
    });
  }

});

module.exports = new Skills;
