'use strict';

//module.exports = function(grunt){
//	var app = require ('./bower.json').appPath || 'app';
//	var dist = 'dist';
//
//	require('load-grunt-config')(grunt);
//};



module.exports = function(grunt) {

	// Initialize config.
	grunt.initConfig({
		pkg: require('./package.json'),
	});

	grunt.loadNpmTasks('grunt-newer');
	// Load per-task config from separate files.
	grunt.loadTasks('grunt');

	grunt.registerTask ('serve','Compile then start a connect web server',function (target){
		if(target === 'dist'){
			return grunt.task.run (['build','connect:dist:keepalive']);
		}
		grunt.task.run ([
			'clean:server',
			'newer:imagemin',
			////'wiredep',
			'compass',
			'copy:fonts',
			'copy:app',
			'autoprefixer',
			'connect:livereload',
			'watch'
		]);
	});

	grunt.registerTask ('server','DEPRECATED TASK. Use the "serve" task instead',function (target){
		grunt.log.warn ('The `server` task has been deprecated. Use `grunt serve` to start a server.');
		grunt.task.run (['serve:'+target]);
	});

	grunt.registerTask ('test',[
		'clean:server',
		//'concurrent:test',
		'autoprefixer',
		'connect:test',
		'karma'
	]);

	grunt.registerTask ('build',[
		'clean:dist',
		//'jshint',
		//'wiredep',
		'useminPrepare',
		'compass',
		'cssmin',
		'copy:fonts',
		//'concat',
		'ngAnnotate',
		'newer:imagemin',
		'copy:dist',
		//'cdnify',
	//	'uglify',
		'usemin',
		'htmlmin'
	]);

	grunt.registerTask ('default',[
		'newer:jshint',
		'test',
		'build'
	]);

};

