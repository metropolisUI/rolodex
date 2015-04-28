'use strict';

/**
 * `cdnify` Converts local URLs to CDN ones
 * in the dist folder for speeding up production.
 */

module.exports = function(grunt) {

	grunt.config('cdnify', {
			dist: {
				html: ['dist/*.html']
			}
		});

	grunt.loadNpmTasks('grunt-cdnify');
};
