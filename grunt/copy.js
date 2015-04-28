'use strict';

/**
 * `copy` will copy files and folders
 * from app over to the .tmp/ and dist/ folders
 */
module.exports = function(grunt){

	grunt.config('copy', {
			dist: {
				files: [
					{
						expand: true,
						dot: true,
						cwd: 'app',
						dest: 'dist',
						src: [
							'**/{,*/}*.{ico,png,txt,svg,zip}','.htaccess','*.html','**/{,*/}*.html','**/{,*/}*.{webp}','**/*.{svg,eot,ttf,woff,woff2}', '**/*.js'
						]
					},
					{
						expand: true,
						cwd: '.tmp/images',
						dest: 'dist/images',
						src: ['generated/*']
					}
				]
			},
			fonts: {
				expand: true,
				dot: true,
				cwd: 'app/sass/fonts',
				dest: 'dist/styles/fonts',
				src: ['**/*.{svg,eot,ttf,woff,woff2}']
			},
			app: {
				files: {
					'.tmp/index.html': 'app/index.html'
				}
			}
		});

	grunt.loadNpmTasks('grunt-contrib-copy');
};