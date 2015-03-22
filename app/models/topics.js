var skills = require('models/skills');

var Topic = Parse.Object.extend({
  className: 'Topic',
  defaults: {
    name: null
  }
});

var Topics = Parse.Collection.extend({
  model: Topic,

  instance: function (data) {
    return new Topic(data);
  },

  comparator: function (a, b) {
    return a.get('name') > b.get('name');
  },

  availableForUser: function (user) {
    var promises = [];
    var query = new Parse.Query(Topic);

    var search = new Parse.Promise();
    promises.push(search);

    skills.forUser(user).then(function (skills) {
      var omittedTopics = skills.toJSON().map(function (skill) {
        return skill.topic.objectId;
      });

      query.notContainedIn('objectId', omittedTopics).find().then(function (topics) {
        topics = new Topics(topics);
        search.resolve(topics);
        return topics;
      });
    }.bind(this));

    return Parse.Promise.when(promises);
  }
});

module.exports = new Topics;
