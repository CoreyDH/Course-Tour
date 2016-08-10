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

    watch: {
      options: { livereload:true },
      js: {
        files: ['js/**/*.js'],
        },
      html: {
        files: ['*.html'],
      },
      css: {
        files: ['css/*.css'],
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

  // Default task(s).
  grunt.registerTask('default', ['concurrent']);
  grunt.registerTask('serve', ['concurrent']);

};
