'use strict';

/**
 * `svgmin` will minify all .svg
 * assets and output them to
 * the /dist folder
 */
module.exports = function(grunt) {

	grunt.config('svgmin', {
		dist: {
			files: [
				{
					expand: true,
					cwd: 'app/**/images',
					src: '{,*/}*.svg',
					dest: 'dist/**/images'
				}
			]
		}
	});

	grunt.loadNpmTasks('grunt-svgmin');
};