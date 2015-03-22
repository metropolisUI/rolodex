var View = require('./view');
var template = require('./templates/home');
var topics = require('models/topics');
var User = require('models/user');

module.exports = View.extend({
  id: 'home-view',
  template: template,

  initialize: function () {
    var promises = [];

    promises.push(topics.fetch().then(function (results) {
      this.data.topics = results.toJSON();
    }.bind(this)));

    promises.push(User.all().then(function (users) {
      this.data.users = users.toJSON();
    }.bind(this)));

    Parse.Promise.when(promises).then(function () {
	    this.render();
    }.bind(this));
  },

	afterRender: function() {
		var searchResults = [],
				userData = this.data.users;

		for(var i = 0; i < userData.length; i++){
			searchResults.push(userData[i].name, userData[i].email, userData[i].jobTitle);
		}

		var substringMatcher = function(strs) {
			return function findMatches(q, cb) {
				var matches, substrRegex;
				matches = [];
				substrRegex = new RegExp(q, 'i');
				$.each(strs, function(i, str) {
					if (substrRegex.test(str)) {
						matches.push({ value: str });
					}
				});

				cb(matches);
			};
		};

		$('.typeahead').typeahead({
					highlight: true,
					minLength: 1,
					name: 'members',
					templates: {
						empty: [
							'<div class="empty-message">',
							'unable to find any Best Picture winners that match the current query',
							'</div>'
						].join('\n'),
						suggestion: function(data){
							return '<p>' + data + '</p>';
						}
					}
				},
				{
					displayKey: 'value',
					source: substringMatcher(searchResults)
				});
	}

});
