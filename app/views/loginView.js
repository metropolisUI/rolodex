var app = require('application');
var View = require('./view');
var template = require('./templates/login');
var User = require('models/user');

module.exports = View.extend({
  id: 'login-view',
  template: template,

  onSubmit: function (e) {
    User.login(this.$emailInput.val(), this.$passwordInput.val());
    e.preventDefault();
  },

  afterRender: function () {
    this.$emailInput = this.$el.find('#email');
    this.$passwordInput = this.$el.find('#password');
    this.$form = this.$el.find('form');
    this.$form.on('submit', function (e) {
      this.onSubmit(e);
    }.bind(this));
  }

});
