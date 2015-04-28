'use strict';

/**
 * `clean` will simply empty our .tmp and
 * the dist folders when they are needing
 * the latest code.
 */
module.exports = function(grunt){

	grunt.config('clean', {
			dist: {
				files: [
					{
						dot: true,
						src: [
							'.tmp','dist/{,*/}*','!dist/.git*'
						]
					}
				]
			},
			server: '.tmp'
		});

	grunt.loadNpmTasks('grunt-contrib-clean');
};