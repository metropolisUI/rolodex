/**
 * `jshint` runs QA tests on the JS code format
 * including our grunt file and all app files.
 *
 * TODO: configure this to follow a style guide like https://github.com/airbnb/javascript
 */
module.exports = function(grunt) {

	grunt.config('jshint',{
		options: {
			jshintrc: '.jshintrc',
			reporter: require('jshint-stylish')
		},
		all: {
			src: [
				'Gruntfile.js',
				'app/**/*.js'
			]
		},
		test: {
			options: {
				jshintrc: 'test/.jshintrc'
			},
			src: ['test/spec/{,*/}*.js']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
};
