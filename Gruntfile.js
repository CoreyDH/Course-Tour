module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		connect: {
			server: {
				options: {
					port: 9001,
					protocol: "http",
					hostname: "localhost",
					base: '.',
					directory: null,
					open: "http://localhost:9001",
					livereload: true,
					keepalive: true,
				}
			}
		},

		compass: {
			dist: {
				options: {
					sassDir: 'src/scss',
					cssDir: 'src/css',
					environment: 'production'
				}
			},
			dev: {
				options: {
					sassDir: 'src/scss',
					cssDir: 'src/css',
					noLineComments: true,
					environment: 'development'
				}
			}
		},

		watch: {
			options: {
				livereload: true
			},
			js: {
				files: ['**/js/*.js'],
			},
			html: {
				files: ['*.html'],
			},
			css: {
				files: ['**/scss/*.scss'],
				tasks: ['compass:dev'],
				options: {
					spawn: false
				}
			}
		},

		concurrent: {
			server: {
				tasks: ['connect', 'watch'],
				options: {
					logConcurrentOutput: true
				}
			}
		},

	}); // End Config

	// Load tasks
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');

	// Default task(s).
	grunt.registerTask('default', ['concurrent']);
	grunt.registerTask('serve', ['concurrent']);

};
