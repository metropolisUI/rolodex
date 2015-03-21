require('lib/parseInit');
var NavView = require('views/navView');

// Application bootstrapper.
var Application = _.extend({
  initialize: function () {
    var Router = require('router');
    this.router = new Router();

    $('#app').prepend((new NavView()).$el);
  }
}, Backbone.Events);

module.exports = Application;
