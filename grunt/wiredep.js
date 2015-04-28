'use strict';
/**
 * `wiredep` Injects Bower
 * dependencies right into your
 * HTML from Grunt.
 */
module.exports = function(grunt){
	grunt.config('wiredep', {

			app: {
				src: ['app/index.html'],
				ignorePath: /\.\.\//
			}

		});

	grunt.loadNpmTasks('grunt-wiredep');
};
