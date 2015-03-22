var app = require('application');
var View = require('./view');
var template = require('./templates/profile');
var User = require('models/user');
var skills = require('models/skills');

module.exports = View.extend({
  id: 'profile-view',
  template: template,

	initialize: function(options){
		this.data = options;

    var promise = new Parse.Promise();

		User.find(this.data.userId).then(function(user){
			if (user) {
				this.data.user = user.toJSON();
				this.data.isOwner = (Parse.User.current() && this.data.userId === Parse.User.current().id);

        skills.forUser(user).then(function (skills) {
          this.data.skills = skills.toJSON();

          promise.resolve('Done!');
        }.bind(this));
			}
		}.bind(this));

    // Run after all promises added
    promise.then(function () {
      this.render();
    }.bind(this));
	}

});
