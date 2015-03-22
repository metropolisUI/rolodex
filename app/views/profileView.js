var app = require('application');
var View = require('./view');
var template = require('./templates/profile');
var User = require('models/user');

module.exports = View.extend({
  id: 'profile-view',
  template: template,
	events: {
		'click .edit-profile': 'edit'
	},

	initialize: function(options){
		this.data = options;
		User.find(this.data.userId).then(function(user){
			if (user) {
				this.data.user = user.toJSON();
				this.data.isOwner = (Parse.User.current() && this.data.userId === Parse.User.current().id);
			}

			this.render();
		}.bind(this));
	}

});
