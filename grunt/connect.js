'use strict';
/**
 * 'connect' runs a local server that
 * loads all of our static assets
 */
module.exports = function(grunt){

	grunt.config ('connect', {
	options: {
		port: 9000,
		hostname: 'localhost',
		livereload: 35729
	},
	livereload: {
		options: {
			open: true,
			middleware: function (connect){
				return [
					connect.static ('.tmp'),connect ().use ('/bower_components',connect.static ('./bower_components')),connect.static ('app')
				];
			}
		}
	},
	test: {
		options: {
			port: 9001,
			middleware: function (connect){
				return [
					connect.static ('.tmp'),connect.static ('test'),connect ().use ('/bower_components',connect.static ('./bower_components')),connect.static ('app')
				];
			}
		}
	},
	dist: {
		options: {
			open: true,
			base: 'dist'
		}
	}
});

	grunt.loadNpmTasks('grunt-contrib-connect');
};