var topics = require('models/topics');
var competencies = require('models/competencies');

var Member = Parse.Object.extend({
	className: 'Member',
	defaults: {
		firstname: null,
		lastname: null,
		email: null,
		jobTitle: null
	}
});

var Members = Parse.Collection.extend({
	model: Member
});

module.exports = new Members;
