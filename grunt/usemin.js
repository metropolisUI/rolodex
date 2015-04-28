'use strict';
/**
 * `usemin` Replaces references to non-optimized
 * scripts or stylesheets into a set of HTML
 * files (or any templates/views).
 */
module.exports = function(grunt){

	grunt.config('useminPrepare', {
		html: 'app/index.html',
		options: {
			dest: 'dist',
			flow: {
				html: {
					steps: {
						js: ['concat', 'uglifyjs'],
						css: ['cssmin']
					},
					post: {}
				}
			}
		}
	});

	grunt.config('usemin', {
		html: ['dist/**/*.html'],
		css: ['dist/**/styles/*.css'],
		js: ['dist/**/*.js'],
		options: {
			assetsDirs: ['dist'],
			patterns: {
				js: [[/(img\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images']],
				css: [[/(img\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the CSS to reference our revved images']]
			}
		}
	});

	grunt.loadNpmTasks('grunt-usemin');
};