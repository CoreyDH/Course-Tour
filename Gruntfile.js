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
				tasks: ['compass:dev', 'cssmin:dist'],
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

		copy: {
			dist: {
				files: [
					// includes files within path
					{
						expand: true,
						flatten: true,
						src: ['src/page/*'],
						dest: 'dist/page',
						filter: 'isFile'
					}, {
						expand: true,
						flatten: true,
						src: ['src/css/coursetour-theme.css'],
						dest: 'dist/css',
						filter: 'isFile'
					}, {
						expand: true,
						flatten: true,
						src: ['src/images/*'],
						dest: 'dist/images',
						filter: 'isFile'
					}, {
						expand: true,
						flatten: true,
						src: ['bower_components/flexslider/fonts/*'],
						dest: 'dist/css/fonts',
						filter: 'isFile'
					}, {
						expand: true,
						flatten: true,
						src: ['bower_components/bootstrap/fonts-only/fonts/*'],
						dest: 'dist/fonts',
						filter: 'isFile'
					},
				],
			},
		},

		uglify: {
			dist: {
				files: {
					'dist/js/coursetour.min.js': ['src/js/coursetour.js', 'bower_components/flexslider/jquery.flexslider.js', 'bower_components/owl.carousel/dist/owl.carousel.js']
				}
			}
		},

		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1
			},
			dist: {
				files: {
					'dist/css/coursetour.min.css': ['src/css/coursetour.css', 'bower_components/owl.carousel/dist/assets/owl.carousel.css'],
				}
			}
		}

	}); // End Config

	// Load tasks
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	// Default task(s).
	grunt.registerTask('default', ['concurrent']);
	grunt.registerTask('serve', ['concurrent']);
	grunt.registerTask('build', ['copy', 'uglify', 'cssmin']);

};
