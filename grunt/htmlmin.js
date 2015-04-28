'use strict';

/**
 * `htmlmin` will minify HTML files
 * and output them to the /dist folder
 */
module.exports = function(grunt){

	grunt.config('htmlmin', {
			dist: {
				options: {
					collapseWhitespace: true,
					conservativeCollapse: true,
					collapseBooleanAttributes: true,
					removeCommentsFromCDATA: true,
					removeOptionalTags: true
				},
				files: [
					{
						expand: true,
						cwd: 'dist',
						src: ['*.html','views/{,*/}*.html'],
						dest: 'dist'
					}
				]
			}
		});

	grunt.loadNpmTasks('grunt-contrib-htmlmin');
};