'use strict';
/**
 * `imagemin` will minify images and
 * output them to the /dist folder.
 */
module.exports = function(grunt) {

	grunt.config('imagemin',{
		dist: {
			files: [{
				expand: true,
				cwd: 'app/**/images',
				src: '{,*/}*.{png,jpg,jpeg,gif,zip}',
				dest: 'dist/**/images'
			}]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-imagemin');
};