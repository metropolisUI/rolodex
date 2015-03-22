require('lib/parseInit');
var NavView = require('views/navView');

// Application bootstrapper.
var Application = {
  initialize: function () {
    var Router = require('router');
    this.router = new Router();

    $('#app').prepend((new NavView()).$el);
  }
};

module.exports = Application;
