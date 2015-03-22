var app = require('application');
var View = require('./view');
var template = require('./templates/profile');
var User = require('models/user');

module.exports = View.extend({
  id: 'profile-view',
  template: template,

	initialize: function(options){
		this.data = options;
		User.find(this.data.userId).then(function(user){
			if (user) {
				this.data.user = user.toJSON();
				this.data.isOwner = (Parse.User.current() && user.objectId === Parse.User.current().objectId);
			}

			this.render();
		}.bind(this));
	}

});
