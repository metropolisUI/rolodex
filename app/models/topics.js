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
  }
});

module.exports = new Topics;
