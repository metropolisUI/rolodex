// Put handlebars.js helpers here
Handlebars.registerHelper("include", function(name, context){
	var template = require ('views/templates/partials/' + name)

	return new Handlebars.SafeString(template(context));
});


Handlebars.registerHelper('times', function(n, block) {
	var accum = '';
	for(var i = 0; i < n; ++i)
		accum += block.fn(i);
	return accum;
});