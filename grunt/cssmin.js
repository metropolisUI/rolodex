'use strict';
module.exports = function(grunt) {

	grunt.config('cssmin',{
		dist: {
			options: {
				keepSpecialComments: 0
			},files: [{
				expand: true,cwd: 'dist',
				src: '404.html',
				dest: 'dist'
			}]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-cssmin');
};
