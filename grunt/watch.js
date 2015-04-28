'use strict';
/**
 * `watch` triggers the `livereload` task whenever
 * changes are made to bower, js, sass, tests, grunt
 * or any image files.
 */
module.exports = function(grunt){

	grunt.config ('watch', {
	bower: {
		files: ['bower.json'],
		tasks: ['wiredep']
	},
	js: {
		files: [
			'app/**/*.js'
		],
		tasks: ['jshint'],
		options: {
			livereload: '<%= connect.options.livereload %>'
		}
	},
	jsTest: {
		files: ['test/spec/**/*.js'],
		tasks: ['newer:jshint:test','karma']
	},
	styles: {
		files: ['app/**/*.{scss,sass}'],
		tasks: ['sass'],
		options: {
			livereload: '<%= connect.options.livereload %>'
		}
	},
	gruntfile: {
		files: ['Gruntfile.js'],
		options: {
			livereload: '<%= connect.options.livereload %>'
		}
	},
	livereload: {
		options: {
			livereload: '<%= connect.options.livereload %>'
		},
		files: [
			'app/**/*.html',
			'.tmp/styles/{,*/}*.css',
			'app/**/*.{png,jpg,jpeg,gif,webp,svg}'
		]
	}
});

	grunt.loadNpmTasks('grunt-contrib-watch');
};