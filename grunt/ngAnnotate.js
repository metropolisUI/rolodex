'use strict';
/**
 * `ngAnnotate` will add, remove and
 * rebuild AngularJS dependency
 * injection annotations.
 */
module.exports = function(grunt){

	grunt.config('ngAnnotate', {
		dist: {
			files: [
				{
					expand: true,
					cwd: '.tmp/concat/scripts',
					src: ['**/*.js','!oldieshim.js'],
					dest: '.tmp/concat/scripts'
				}
			]
		}
	});

	grunt.loadNpmTasks('grunt-ng-annotate');
};
