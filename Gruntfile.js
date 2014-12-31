module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    bower: {
      install: {
        options: {
          targetDir: 'client/src/libs',
          layout: 'byComponent'
        }
      }
    },

    clean: {
      build: ['./build']
    },

    browserify: {
     app: {
        files: {
          'build/app.js': ['client/src/app.js']
        }
      }
    },

    jshint: {
      all: {
        files: {
          src: ['Gruntfile.js', './client/src/**/*.js']
        },
        options: {
          force: true
        }
      } 
    },

    uglify: {
      main: {
        options: {
          compress: true,
          verbose: true
        },
        files: {
          './public/javascripts/main.js': ['./build/main.js']
        }
      }
    },

    concat: {
      libs: {
        src: ['./client/src/libs/jquery/js/jquery.js', './client/src/libs/underscore/js/underscore.js', './client/src/libs/backbone/js/backbone.js'],
        dest: './build/libs.js'
      },
      main: {
        src: ['./build/libs.js', './build/app.js'],
        dest: './build/main.js'
      }
    },

    stylus: {
      compile: {
        options: {
          paths: ['./node_modules/nib/'],
          import: ['nib']
        },
        files: {
          './public/stylesheets/main.css': './client/css/style.styl'
        }
      }
    }

  });

  grunt.registerTask('copy', function() {
    grunt.file.copy('./build/main.js', './public/javascripts/main.js');
  });

  grunt.registerTask('init:dev', ['clean', 'bower:install']);
  grunt.registerTask('build:dev', ['clean', 'jshint:all', 'browserify:app', 'concat:libs', 'concat:main', 'stylus:compile', 'copy']);
  grunt.registerTask('build:prod', ['clean', 'jshint:all', 'browserify:app', 'concat:libs', 'concat:main', 'uglify', 'stylus:compile']);

};
