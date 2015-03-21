var View = require('./view');
var template = require('./templates/home');
var topics = require('models/topics');

module.exports = View.extend({
  id: 'home-view',
  template: template,

  initialize: function () {
    topics.fetch({
      success: function (results) {
        this.data.topics = results.toJSON();

        this.render();
      }.bind(this)
    });
  }

});
