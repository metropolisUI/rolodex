'use strict';
/**
 * `sass` Compiles Sass and
 * places the CSS output under
 * a /styles folder.
 *
 */
module.exports = function(grunt) {

	grunt.config('compass',{
		compass: {
			dist: {
				options: {
					sassDir: 'app/sass',
					cssDir: 'app/styles'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-compass');
};