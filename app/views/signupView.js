var app = require('application');
var View = require('./view');
var template = require('./templates/signup');
var User = require('models/user');

module.exports = View.extend({
  id: 'signup-view',
  template: template,

  onSubmit: function (e) {
    User.create({
      email: this.$emailInput.val(),
      password: this.$passwordInput.val()
    }, {
      name: this.$nameInput.val(),
      jobTitle: this.$jobTitleInput.val()
    });

    e.preventDefault();
  },

  afterRender: function () {
    this.$emailInput = this.$el.find('#email');
    this.$passwordInput = this.$el.find('#password');
    this.$nameInput = this.$el.find('#name');
    this.$jobTitleInput = this.$el.find('#jobTitle');
    this.$form = this.$el.find('form');
    this.$form.on('submit', function (e) {
      this.onSubmit(e);
    }.bind(this));
  }

});
