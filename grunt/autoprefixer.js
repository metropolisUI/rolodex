'use strict';

/**
 * `autoprefixer` will Parse CSS and add
 * vendor-prefixed CSS properties using
 * the Can I Use database. Based on Autoprefixer.
 *
 * TODO: test and configure this task
 */
module.exports = function(grunt){

	grunt.config('autoprefixer', {
		options: {
			browsers: ['last 1 version']
		},
		dist: {
			files: [
				{
					expand: true,
					cwd: '.tmp/styles/',
					src: '{,*/}*.css',
					dest: '.tmp/styles/'
				}
			]
		}
	});

	grunt.loadNpmTasks('grunt-autoprefixer');

};