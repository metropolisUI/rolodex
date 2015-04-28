'use strict';


/**
 * `karma` grunt plugin for karma test runner
 */
module.exports = function(grunt){

	grunt.config('karma', {
		karma: {
			unit: {
				configFile: 'test/karma.conf.js',
				singleRun: true
			}
		}
	});

	grunt.loadNpmTasks('grunt-karma')
};
