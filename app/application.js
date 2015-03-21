require('lib/parseInit');

// Application bootstrapper.
var Application = _.extend({
  initialize: function () {
    var Router = require('router');
    this.router = new Router();
  }
}, Backbone.Events);

module.exports = Application;
