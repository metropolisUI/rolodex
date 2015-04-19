(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path].exports;
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex].exports;
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.register("application", function(exports, require, module) {
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

});

require.register("initialize", function(exports, require, module) {
var application = require('application');

$(function () {
  application.initialize();
  Backbone.history.start();
});

});

require.register("lib/parseInit", function(exports, require, module) {
Parse.initialize("uTAI2TS4OQWE6Ab90co1oyXO4kbRTvfhfgXLMf1U", "h9z9rmRrmlA47mE66lY33xvGk0f3ooPLrNKEozp5");

module.exports = Parse;
});

require.register("lib/viewHelper", function(exports, require, module) {
// Put handlebars.js helpers here
Handlebars.registerHelper('include', function(name, context){
	var template = require ('views/templates/partials/' + name);

	return new Handlebars.SafeString(template(context));
});


Handlebars.registerHelper('times', function(n, block) {
	var accum = '';
	for(var i = 0; i < n; ++i)
		accum += block.fn(i);
	return accum;
});


Handlebars.registerHelper('gravatar', function(email, size) {
  var User = require('models/user');

	return new Handlebars.SafeString('<img src="' + User.gravatarUrl(email, size) + '" />');
});


Handlebars.registerHelper('gravatarUrl', function(email, size) {
  var User = require('models/user');

	return new Handlebars.SafeString(User.gravatarUrl(email, size));
});

});

require.register("models/competencies", function(exports, require, module) {
var Competency = Parse.Object.extend({
  className: 'Competency',
  defaults: {
    name: null,
    abbr: null
  }
});

var Competencies = Parse.Collection.extend({
  model: Competency
});

// Static definitions for now stupid
module.exports = new Competencies([
  new Competency({ name: 'Junior', abbr: 'Jr' }),
  new Competency({ name: 'Mid', abbr: 'Mid' }),
  new Competency({ name: 'Senior', abbr: 'Sr' })
]);

});

require.register("models/member", function(exports, require, module) {
var topics = require('models/topics');
var competencies = require('models/competencies');

var Member = Parse.Object.extend({
	className: 'Member',
	defaults: {
		firstname: null,
		lastname: null,
		email: null,
		jobTitle: null,
		profilePic: null
	}
});

var Members = Parse.Collection.extend({
	model: Member
});

module.exports = new Members;

});

require.register("models/skills", function(exports, require, module) {
var competencies = require('models/competencies');

var Skill = Parse.Object.extend({
  className: 'Skill',
  defaults: {
    topic: null,
    competency: null,
    user: null
  },

  // Get a `new Competency()`
  getCompetency: function () {
    var comps = competencies.filter(function (model) {
      return model.get('abbr') === this.get('competency');
    }.bind(this));

    // Return first or null
    if (comps.length) {
      return comps[0];
    }
    else {
      return comps;
    }
  },

  // Backbone Problem: Have to manually convert subproperties to JSON correctly
  // Backbone Problem: Models with relational data are not easy to work with (Solution: Store?)
  toJSON: function () {
    var output = {};

    _.each(this.attributes, function (data, key) {
      var fnName = 'get' + key.charAt(0).toUpperCase() + key.slice(1);

      // Get expected format
      if (_.isFunction(this[fnName])) {
        data = this[fnName]();
      }

      // Convert to basic JSON
      if (_.isObject(data) && data._hasData) {
        output[key] = data.toJSON();
      }
      else {
        output[key] = data;
      }
    }.bind(this));

    return output;
  }

});

var Skills = Parse.Collection.extend({
  model: Skill,

  instance: function (data) {
    return new Skill(data);
  },

  comparator: function (obj) {
    return obj.get('topic').get('name');
  },

  forUser: function (user) {
    var query = new Parse.Query(Skill);
    return query.equalTo('user', user).include('topic').include('user').find().then(function (results) {
      return new Skills(results);
    });
  }

});

module.exports = new Skills;

});

require.register("models/topics", function(exports, require, module) {
var skills = require('models/skills');

var Topic = Parse.Object.extend({
  className: 'Topic',
  defaults: {
    name: null
  }
});

var Topics = Parse.Collection.extend({
  model: Topic,

  instance: function (data) {
    return new Topic(data);
  },

  comparator: function (obj) {
    return obj.get('name');
  },

  availableForUser: function (user) {
    var promises = [];
    var query = new Parse.Query(Topic);

    var search = new Parse.Promise();
    promises.push(search);

    skills.forUser(user).then(function (skills) {
      var omittedTopics = skills.toJSON().map(function (skill) {
        return skill.topic.objectId;
      });

      query.notContainedIn('objectId', omittedTopics).find().then(function (topics) {
        topics = new Topics(topics);
        search.resolve(topics);
        return topics;
      });
    }.bind(this));

    return Parse.Promise.when(promises);
  }
});

module.exports = new Topics;

});

require.register("models/user", function(exports, require, module) {
var app = require('application');

var User = {
  create: function (credentials, profileInfo) {
    var user = new Parse.User();

    if (profileInfo) {
      var key;
      for (key in profileInfo) {
        if (profileInfo.hasOwnProperty(key)) {
          user.set(key, profileInfo[key]);
        }
      }
    }

    // Override specific values
    user.set('username', credentials.email);
    user.set('email', credentials.email);
    user.set('password', credentials.password);

    user.signUp(null, {
      success: function(user) {
        var app = require('application');

        Backbone.Mediator.pub('change:user');
        app.router.navigate('#profile/' + user.id, {trigger:true});
      },
      error: function(user, error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);
      }
    });
  },

  login: function (email, password) {
    return Parse.User.logIn(email, password, {
      success: function (user) {
        var app = require('application');

        Backbone.Mediator.pub('change:user');
        app.router.navigate('', {trigger:true});
      },
      error: function(user, error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);
      }
    });
  },

  logout: function () {
    var app = require('application');

    Parse.User.logOut();
    Backbone.Mediator.pub('change:user');
    app.router.navigate('', {trigger:true});
  },

  all: function () {
    var query = new Parse.Query(Parse.User);
    return query.find().then(function (users) {
      return new Parse.Collection(users);
    });
  },

  gravatarUrl: function (email, size) {
    return 'http://www.gravatar.com/avatar/' + md5(email) + '?d=retro' + (size ? '&s=' + size : '');
  },

	find: function(id) {
		var query = new Parse.Query(Parse.User);
		return query.equalTo("objectId", id).find().then(function (user){
			if (user) {
				return user[0];
			}
			return user;
		});
	}
};

module.exports = User;

});

require.register("router", function(exports, require, module) {
var application = require('application');
var User = require('models/user');

var HomeView = require('views/homeView');
var TopicView = require('views/topicView');
var SignupView = require('views/signupView');
var LoginView = require('views/loginView');
var ProfileView = require('views/profileView');
var SkillsView = require('views/skillsView');

module.exports = Backbone.Router.extend({
  routes: {
    '': 'home',
    'topic': 'topic',
    'register': 'register',
    'login': 'login',
    'logout': 'logout',
    'profile/:id': 'profile',
    'skills': 'skills',
  },

  home: function () {
    this.render(new HomeView());
  },

  topic: function () {
    this.render(new TopicView());
  },

  register: function () {
    this.render(new SignupView());
  },

  login: function () {
    this.render(new LoginView());
  },

  logout: function () {
    User.logout();
  },

  profile: function (id) {
	this.render(new ProfileView({userId: id}));
  },

  skills: function () {
    this.render(new SkillsView());
  },


  // Common functions
  render: function (view) {
    if (this.currentView) {
      this.currentView.remove();
    }

    $('#ui-view').html(view.$el);
    this.currentView = view;

    return this;
  }

});

});

require.register("views/homeView", function(exports, require, module) {
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

		var memberResults = $('#member-results');
		var skillResults = $('#skill-results');
		var roleResults = $('#role-results');


		$("input:checkbox[id^=checkMembers]").click(function() {
			if ($(this).is(':checked')) {
				memberResults.show();
			} else {
				memberResults.hide();
			}
		});

		$("input:checkbox[id^=checkSkills]").click(function() {
			if ($(this).is(':checked')) {
				skillResults.show();
			} else {
				skillResults.hide();
			}
		});
		$("input:checkbox[id^=checkRoles]").click(function() {
			if ($(this).is(':checked')) {
				roleResults.show();
			} else {
				roleResults.hide();
			}
		});




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
					name: 'members'
				},
				{
					displayKey: 'value',
					source: substringMatcher(searchResults)
				});
	}

});


//TODO:
// on input focus hide content
// on input search show dropdown of likely results
// on enter or button press populate content results
});

;require.register("views/loginView", function(exports, require, module) {
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

});

require.register("views/navView", function(exports, require, module) {
var app = require('application');
var View = require('./view');
var template = require('./templates/nav');
var User = require('models/user');

module.exports = View.extend({
  id: 'nav-view',
  template: template,

  initialize: function () {
    Backbone.Mediator.sub('change:user', function () {
      var user = Parse.User.current();

      if (user) {
        user = user.toJSON();
      }

      this.data.user = user;
      this.render();
    }.bind(this));

    Backbone.Mediator.pub('change:user');
  }

});

});

require.register("views/profileView", function(exports, require, module) {
var app = require('application');
var View = require('./view');
var template = require('./templates/profile');
var User = require('models/user');
var skills = require('models/skills');

module.exports = View.extend({
  id: 'profile-view',
  template: template,
	events: {
		'click .edit-profile': 'editProfile'
	},

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
	},
	editProfile: function (e){
		e.preventDefault ();
		$ ('a.edit-profile').text ('save edits');
		$ ('label.name-label').hide ();
		$ ('input.edit-name').show ();
		$ ('input.edit-title').show ();
		$ ('label.title-label').hide ();
	}

});

});

require.register("views/signupView", function(exports, require, module) {
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

});

require.register("views/skillsView", function(exports, require, module) {
var app = require('application');
var View = require('./view');
var template = require('./templates/skills');
var topics = require('models/topics');
var skills = require('models/skills');
var competencies = require('models/competencies');

module.exports = View.extend({
  id: 'skills-view',
  template: template,

  initialize: function () {
    // WARNING: Automatically adding skills to current logged in user
    this.data.userObject = Parse.User.current();

    // If not logged in, you can't access this page
    if (!this.data.userObject) {
      app.router.navigate('', {trigger:true});
    }
    this.data.user = this.data.userObject.toJSON();

    topics.availableForUser(this.data.userObject).then(function (topics) {
      this.data.competencies = competencies.toJSON();
      this.data.topicsCollection = topics;
      this.data.topics = topics.toJSON();
      this.render();
    }.bind(this));
  },

  onSubmit: function (e) {
    e.preventDefault();

    var topic = this.data.topicsCollection.get(this.$topicInput.val());

    var skill = skills.instance({});
    skill.set('topic', topic);
    skill.set('competency', this.$competencyInput.val());
    skill.set('user', this.data.userObject);
    skill.save();

    this.data.alert = 'Skill Saved!';
    // Remove latest added skill from dropdown
    this.data.topics = this.data.topics.filter(function (model) {
      return model.objectId !== topic.id;
    });
    this.render();
  },

  afterRender: function () {
    this.$topicInput = this.$('#topic');
    this.$topicInput.material_select();
    this.$competencyInput = this.$('#competency');
    this.$competencyInput.material_select();
    this.$form = this.$('form');
    this.$form.on('submit', function (e) {
      this.onSubmit(e);
    }.bind(this));

    // Clear alert after save
    this.data.alert = null;
  }

});

});

require.register("views/templates/home", function(exports, require, module) {
var __templateData = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, lambda=this.lambda;
  return "                    <li class=\"collection-item avatar\">\n                        <img src=\""
    + escapeExpression(((helpers.gravatarUrl || (depth0 && depth0.gravatarUrl) || helperMissing).call(depth0, (depth0 != null ? depth0.email : depth0), "200", {"name":"gravatarUrl","hash":{},"data":data})))
    + "\" alt=\"\" class=\"circle\">\n                        <span class=\"title\"> "
    + escapeExpression(lambda((depth0 != null ? depth0.name : depth0), depth0))
    + "</span>\n\n                        <p>"
    + escapeExpression(lambda((depth0 != null ? depth0.jobTitle : depth0), depth0))
    + "</p>\n                        <a href=\"#profile/"
    + escapeExpression(lambda((depth0 != null ? depth0.objectId : depth0), depth0))
    + "\" class=\"secondary-content\">profile</a>\n                    </li>\n";
},"3":function(depth0,helpers,partials,data) {
  return "                    <h2>No Results, bro!</h2>\n";
  },"5":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                    <li class=\"collection-item\">\n                        <span class=\"title\"> "
    + escapeExpression(lambda((depth0 != null ? depth0.name : depth0), depth0))
    + "</span>\n                    </li>\n";
},"7":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                    <li class=\"collection-item\">\n                        <span class=\"title\"> "
    + escapeExpression(lambda((depth0 != null ? depth0.jobTitle : depth0), depth0))
    + "</span>\n                    </li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"main-content\">\n    <div class=\"row\">\n\n        <div id=\"home-search\">\n            <nav class=\"member-search\">\n                <div class=\"input-field\">\n                    <input class=\"typeahead\" id=\"search-bar\" type=\"text\"\n                           placeholder=\"Search by name, job title, or skill...\">\n                </div>\n            </nav>\n            <a class=\"waves-effect waves-light btn-large\"><i class=\"mdi-action-search\"></i></a>\n        </div>\n        <div class=\"search-filters\">\n            <p>filters results:</p>\n            <p>\n                <input type=\"checkbox\" id=\"checkMembers\" checked=\"checked\"/>\n                <label for=\"checkMembers\">members</label>\n            </p>\n            <p>\n                <input type=\"checkbox\" id=\"checkSkills\" checked=\"checked\" />\n                <label for=\"checkSkills\">skills</label>\n            </p>\n            <p>\n                <input type=\"checkbox\" id=\"checkRoles\" checked=\"checked\"/>\n                <label for=\"checkRoles\">roles</label>\n            </p>\n        </div>\n\n    </div>\n    <div class=\"row\">\n        <div class=\"col m4\">\n            <h4 class=\"category-title\">members</h4>\n            <ul class=\"collection\" id=\"member-results\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.users : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "            </ul>\n        </div>\n        <div class=\"col m4\">\n            <h4 class=\"category-title\">skills</h4>\n            <ul class=\"collection\" id=\"skill-results\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.topics : depth0), {"name":"each","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "            </ul>\n        </div>\n\n        <div class=\"col m4\">\n            <h4 class=\"category-title\">roles</h4>\n            <ul class=\"collection\" id=\"role-results\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.users : depth0), {"name":"each","hash":{},"fn":this.program(7, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "            </ul>\n        </div>\n\n    </div>\n</div>";
},"useData":true});
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/login", function(exports, require, module) {
var __templateData = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<header>\n	<div class=\"container\">\n		<h3>Login</h3>\n	</div>\n</header>\n\n<div class=\"container\">\n\n  <div class=\"row\">\n    <form class=\"col s12\">\n      <div class=\"row\">\n        <div class=\"input-field col s6\">\n          <input id=\"email\" type=\"text\" class=\"validate\">\n          <label for=\"email\">Email</label>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"input-field col s6\">\n          <input id=\"password\" type=\"password\" class=\"validate\">\n          <label for=\"password\">Password</label>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"input-field col s6\">\n           <button class=\"btn waves-effect waves-light\" type=\"submit\" name=\"action\">Login</button>\n        </div>\n      </div>\n    </form>\n  </div>\n\n  <a href=\"#register\">Want to Register?</a>\n	\n</div>\n";
  },"useData":true});
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/nav", function(exports, require, module) {
var __templateData = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return "        <li><a href=\"#topic\">Topics</a></li>\n        <li><a href=\"#skills\">Skills</a></li>\n";
  },"3":function(depth0,helpers,partials,data) {
  return "        <li><a href=\"#register\">Register</a></li>\n";
  },"5":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "        <li><a href=\"#profile/"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.objectId : stack1), depth0))
    + "\" class=\"blue lighten-2\">Logged in as: "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.name : stack1), depth0))
    + "</a></li>\n        <li><a href=\"#logout\" class=\"red lighten-1\">Logout</a></li>\n";
},"7":function(depth0,helpers,partials,data) {
  return "        <li><a href=\"#login\">Login</a></li>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<nav>\n  <div class=\"nav-wrapper blue-grey darken-1\">\n    <a href=\"#\" class=\"brand-logo center\">Members Directory</a>\n    <ul id=\"nav-mobile\" class=\"left\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.user : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "    </ul>\n    <ul id=\"nav-mobile\" class=\"right\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.user : depth0), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.program(7, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </ul>\n  </div>\n</nav>\n";
},"useData":true});
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/partials/member", function(exports, require, module) {
var __templateData = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, lambda=this.lambda;
  return "<div id=\"member-partial\">\n    <div class=\"card\">\n        <div class=\"card-image waves-effect waves-block waves-light\">\n            <img class=\"activator\" src=\""
    + escapeExpression(((helpers.gravatarUrl || (depth0 && depth0.gravatarUrl) || helperMissing).call(depth0, (depth0 != null ? depth0.email : depth0), "200", {"name":"gravatarUrl","hash":{},"data":data})))
    + "\">\n        </div>\n\n        <div class=\"card-content\">\n                    <span class=\"card-title activator grey-text text-darken-4\">\n                        "
    + escapeExpression(lambda((depth0 != null ? depth0.name : depth0), depth0))
    + " <i class=\"mdi-navigation-more-vert right\"></i>\n                    </span>\n            <p>"
    + escapeExpression(lambda((depth0 != null ? depth0.jobTitle : depth0), depth0))
    + "</p>\n        </div>\n\n        <div class=\"card-reveal\">\n                    <span class=\"card-title grey-text text-darken-4\">\n                        "
    + escapeExpression(lambda((depth0 != null ? depth0.name : depth0), depth0))
    + " <i class=\"mdi-navigation-close right\"></i>\n                    </span>\n            <p>[[ list of users skills ]]</p>\n            <a href=\"#profile/"
    + escapeExpression(lambda((depth0 != null ? depth0.objectId : depth0), depth0))
    + "\">user profile</a>\n        </div>\n    </div>\n</div>\n";
},"useData":true});
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/profile", function(exports, require, module) {
var __templateData = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, lambda=this.lambda, buffer = "<div class=\"container profile-detail\">\n    <div class=\"card\">\n        <div class=\"row\">\n            <div class=\"col s3\">\n                <img src=\""
    + escapeExpression(((helpers.gravatarUrl || (depth0 && depth0.gravatarUrl) || helperMissing).call(depth0, ((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.email : stack1), "200", {"name":"gravatarUrl","hash":{},"data":data})))
    + "\"/>\n            </div>\n            <div class=\"col s8\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.isOwner : depth0), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "                <h4>\n                    <i class=\"mdi-action-perm-identity\"></i>\n                    <input class=\"edit-name\" type=\"text\" placeholder=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.name : stack1), depth0))
    + "\"/>\n                    <label class=\"name-label\">  "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.name : stack1), depth0))
    + " </label>\n                </h4>\n\n                <p><i class=\"mdi-communication-email\"></i> "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.email : stack1), depth0))
    + "</p>\n\n                <p>\n                    <i class=\"mdi-action-star-rate\"></i>\n                    <input class=\"edit-title\" type=\"text\" placeholder=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.jobTitle : stack1), depth0))
    + "\"/>\n                    <label class=\"title-label\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.jobTitle : stack1), depth0))
    + " </label>\n                </p>\n            </div>\n        </div>\n\n        <div class=\"row\">\n            <section class=\"skills-section\">\n              <h4>Member Skills ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.isOwner : depth0), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "</h4>\n              <ul>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.skills : depth0), {"name":"each","hash":{},"fn":this.program(6, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "              </ul>\n            </section>\n        </div>\n    </div>\n</div>\n";
},"2":function(depth0,helpers,partials,data) {
  return "                <p class=\"profile-settings\">\n                    <a class=\"edit-profile\" href=\"#\"><i class=\"mdi-image-edit\"></i>edit profile</a>\n                </p>\n";
  },"4":function(depth0,helpers,partials,data) {
  return "<a class=\"btn-floating btn-small waves-effect waves-light red\" href=\"#/skills\"><i class=\"mdi-content-add\"></i></a>";
  },"6":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "                <li>"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.topic : depth0)) != null ? stack1.name : stack1), depth0))
    + " ("
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.competency : depth0)) != null ? stack1.name : stack1), depth0))
    + ")</li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.user : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/signup", function(exports, require, module) {
var __templateData = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "    <p class=\"card-panel teal lighten-4\">"
    + escapeExpression(((helper = (helper = helpers.alert || (depth0 != null ? depth0.alert : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"alert","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<header>\n	<div class=\"container\">\n		<h3>Add Member</h3>\n	</div>\n</header>\n\n<div class=\"container\">\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.alert : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n  <div class=\"row\">\n    <form class=\"col s12\">\n      <div class=\"row\">\n        <div class=\"input-field col s6\">\n          <input id=\"email\" type=\"text\" class=\"validate\">\n          <label for=\"email\">Email</label>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"input-field col s6\">\n          <input id=\"password\" type=\"password\" class=\"validate\">\n          <label for=\"password\">Password</label>\n        </div>\n      </div>\n\n      <div class=\"row\">\n        <div class=\"input-field col s6\">\n          <input id=\"name\" type=\"text\" class=\"validate\">\n          <label for=\"name\">Name</label>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"input-field col s6\">\n          <input id=\"jobTitle\" type=\"text\" class=\"validate\">\n          <label for=\"jobTitle\">Job Title</label>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"input-field col s6\">\n           <button class=\"btn waves-effect waves-light\" type=\"submit\" name=\"action\">Create Account</button>\n        </div>\n      </div>\n    </form>\n  </div>\n	\n</div>\n";
},"useData":true});
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/skills", function(exports, require, module) {
var __templateData = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "    <p class=\"card-panel teal lighten-4\">"
    + escapeExpression(((helper = (helper = helpers.alert || (depth0 != null ? depth0.alert : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"alert","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"3":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "            <option value=\""
    + escapeExpression(lambda((depth0 != null ? depth0.objectId : depth0), depth0))
    + "\">"
    + escapeExpression(lambda((depth0 != null ? depth0.name : depth0), depth0))
    + "</option>\n";
},"5":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "            <option value=\""
    + escapeExpression(lambda((depth0 != null ? depth0.abbr : depth0), depth0))
    + "\">"
    + escapeExpression(lambda((depth0 != null ? depth0.name : depth0), depth0))
    + "</option>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "<header>\n	<div class=\"container\">\n		<h3>Add Skills <label>to your profile</label></h3>\n	</div>\n</header>\n\n<div class=\"container\">\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.alert : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n  <div class=\"row\">\n    <form class=\"col s12\">\n      <div class=\"row\">\n        <div class=\"input-field col s6\">\n          <label for=\"topic\">Topic</label>\n          <select id=\"topic\" required>\n            <option value=\"\" disabled selected>Choose your option</option>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.topics : depth0), {"name":"each","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "          </select>\n        </div>\n        <div class=\"input-field col s6\">\n          <label for=\"competency\">Competency</label>\n          <select id=\"competency\" required>\n            <option value=\"\" disabled selected>Choose your competency</option>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.competencies : depth0), {"name":"each","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "          </select>\n        </div>\n        <div class=\"input-field col s6\">\n           <button class=\"btn waves-effect waves-light\" type=\"submit\" name=\"action\">Submit\n            <i class=\"mdi-content-send right\"></i>\n          </button>\n        </div>\n      </div>\n    </form>\n  </div>\n\n  <div class=\"buttons\">\n    <a class=\"waves-effect waves-light btn\" href=\"#profile/"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.objectId : stack1), depth0))
    + "\">Back to Profile</a>\n  </div>\n	\n</div>\n";
},"useData":true});
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/topic", function(exports, require, module) {
var __templateData = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "    <p class=\"card-panel teal lighten-4\">"
    + escapeExpression(((helper = (helper = helpers.alert || (depth0 != null ? depth0.alert : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"alert","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<header>\n	<div class=\"container\">\n		<h3>Add Topic <label>for all users</label></h3>\n	</div>\n</header>\n\n<div class=\"container\">\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.alert : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n  <div class=\"row\">\n    <form class=\"col s12\">\n      <div class=\"row\">\n        <div class=\"input-field col s6\">\n          <input id=\"topic\" type=\"text\" class=\"validate\">\n          <label for=\"topic\">Topic</label>\n        </div>\n        <div class=\"input-field col s6\">\n           <button class=\"btn waves-effect waves-light\" type=\"submit\" name=\"action\">Submit\n            <i class=\"mdi-content-send right\"></i>\n          </button>\n        </div>\n      </div>\n    </form>\n  </div>\n\n  <div class=\"buttons\">\n    <a class=\"waves-effect waves-light btn\" href=\"#\">Home</a>\n  </div>\n	\n</div>\n";
},"useData":true});
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/topicView", function(exports, require, module) {
var app = require('application');
var View = require('./view');
var template = require('./templates/topic');
var topics = require('models/topics');

module.exports = View.extend({
  id: 'topic-view',
  template: template,

  initialize: function () {
    topics.fetch({
      success: function (results) {
        this.data.topics = results.toJSON();

        this.render();
      }.bind(this)
    });
  },

  onSubmit: function (e) {
    var topic = topics.instance({
      name: this.$topicInput.val()
    });

    topic.save();
    e.preventDefault();
    this.data.alert = 'Topic Saved!';
    this.render();
  },

  afterRender: function () {
    this.$topicInput = this.$el.find('#topic');
    this.$form = this.$el.find('form');
    this.$form.on('submit', function (e) {
      this.onSubmit(e);
    }.bind(this));

    // Clear alert after save
    this.data.alert = null;
  }

});

});

require.register("views/view", function(exports, require, module) {
require('lib/viewHelper');

// Base class for all views
module.exports = Backbone.View.extend({

  data: {},

  initialize: function () {
    this.render = _.bind(this.render, this);
    this.render();
  },

  template: function () {

  },

  serialize: function () {
    return this.data;
  },

  beforeRender: function () {

  },

  render: function () {
    this.beforeRender();
    this.$el.html(this.template(this.serialize()));
    this.afterRender();
    return this;
  },

  afterRender: function () {

  }

});

});


//# sourceMappingURL=app.js.map