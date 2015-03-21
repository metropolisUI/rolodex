var app = require('application');
var View = require('./view');
var template = require('./templates/profile');

module.exports = View.extend({
  id: 'profile-view',
  template: template,

});
