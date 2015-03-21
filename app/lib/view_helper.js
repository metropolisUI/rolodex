// Put handlebars.js helpers here
Handlebars.registerHelper("include", function(name, context){
	var template = require ('views/templates/partials/' + name)

	return new Handlebars.SafeString(template(context));
});
