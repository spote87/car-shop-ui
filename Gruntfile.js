module.exports = function (grunt) {

  grunt.initConfig({

    // JS TASKS ================================================================
    // check all js files for errors
    jshint: {
      all: ['src/app/*.js', 'src/app/**/*.js']
    },

    // take all the js files and minify them into app.min.js
    uglify: {
      options: {
        preserveComments: false
      },
      build: {
        files: {
          'src/dist/app/app.min.js': [
            'src/app/app.module.js',
            'src/app/app.config.js',
            'src/app/controllers/**/*.js']
          // 'src/app/app.controller.js',
          // 'src/app/components/**/*.js',
          // 'src/app/states/**/*.js']
        }
      }
    },

    less: {
      build: {
        files: {
          'src/dist/app/css/main.css': 'src/css/*.less'
        }
      }
    },

    cssmin: {
      build: {
        files: {
          'src/dist/app/css/style.min.css': [
            'src/css/*.css',
            'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css',
            'bower_modules/bootstrap/dist/css/bootstrap.css',
            'node_modules/ng-table/bundles/ng-table.min.css',
            'node_modules/ui-select/dist/select.css'
          ]
        }
      }
    },

    watch: {
      css: {
        files: ['src/css/**/*.less', 'src/css/**/*.css'],
        tasks: ['less', 'cssmin']
      },
      js: {
        files: ['src/app/**/*.js'],
        tasks: ['jshint', 'uglify']
      },
      html: {
        files: ['src/*.html', 'src/**/*.html'],
      }
    },

    nodemon: {
      options: {
        legacyWatch: true,
        callback: function (nodemon) {
          console.log('firing event');
          grunt.event.emit('serverListening');
        },
      },
      dev: {
        script: 'server.js'
      }
    },

    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      tasks: ['nodemon', 'open', 'watch']
    },
    open: {
      dev: {
        path: 'http://localhost:8000',
        app: 'Google Chrome',
      }
    },

    copy: {
      bowermodules: {
        expand: true,
        cwd: 'bower_components/',
        src: [
          'angular/angular.js',
          'angular-mocks/angular-mocks.js',
        ],
        dest: 'src/dist/lib',
        filter: 'isFile'
      },
      nodemodules: {
        expand: true,
        cwd: 'node_modules/',
        src: [
          'angular-route/angular-route.min.js',
          'ui-select/dist/select.min.js',
          'angular-sanitize/angular-sanitize.min.js',
          'angular-resource/angular-resource.min.js',
          'angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
          'ng-table/bundles/ng-table.min.js',
          'angular-animate/angular-animate.js'
        ],
        dest: 'src/dist/lib',
        filter: 'isFile'
      },
      fonts: {
        expand: true,
        cwd: 'bower_components/bootstrap',
        src: [
          'fonts/glyphicons-halflings-regular.woff2'
        ],
        dest: 'src/dist/app',
        filter: 'isFile'
      },
      mock: {
        expand: true,
        cwd: 'test/',
        src: [
          'mocks/mockData.js',
          'mocks/mockConfig.js'
        ],
        dest: 'src/dist/',
        filter: 'isFile'
      }
    },

    clean: {
      build: {
        src: ['src/dist/*']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-open');

  grunt.registerTask('build', ['clean', 'less', 'cssmin', 'jshint', 'uglify', 'copy']);
  grunt.registerTask('default', ['less', 'cssmin', 'jshint', 'uglify', 'copy', 'concurrent']);

};
