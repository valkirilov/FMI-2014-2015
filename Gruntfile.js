module.exports = function(grunt) {

  grunt.initConfig({
	pkg : grunt.file.readJSON('package.json'),
      connect: {
        server: {
          options: {},
        }
      },
      sass: {
        dist: {
          options: {
            style: 'compressed'
          },
          files: {
            'app/css/app.css': 'app/css/sass/app.scss',
            // 'app/css/base.css': 'app/css/scss/base.scss',
          }
        }
      },
      concat: {
        controllers: {
          src: ['app/scripts/controllers/controllers.header', 'app/scripts/controllers/*.js'],
          dest: 'app/scripts/controllers.js'
        },
        services: {
          src: ['app/scripts/services/services.header', 'app/scripts/services/*.js'],
          dest: 'app/scripts/services.js'
        },
        filters: {
          src: ['app/scripts/filters/filters.header', 'app/scripts/filters/*.js'],
          dest: 'app/scripts/filters.js'
        },
        directives: {
          src: ['app/scripts/directives/directives.header', 'app/scripts/directives/*.js'],
          dest: 'app/scripts/directives.js'
        },
        css: {
          src: ['app/css/app.css', 'app/css/avatar.css', 'app/css/moods.css'],
          dest: 'app/css/app.css'
        }
      },
//      ngmin: {
//        controllers: {
//          src: ['test/src/controllers/one.js'],
//          dest: 'test/generated/controllers/one.js'
//        },
//        directives: {
//          expand: true,
//          cwd: 'test/src',
//          src: ['directives/**/*.js'],
//          dest: 'test/generated'
//        }
//      },
      nggettext_extract: {
          pot: {
              files: {
                  'app/po/template.pot': ['app/*.html', 'app/partials/*.html']
              }
          },
      },
      nggettext_compile: {
          all: {
              files: {
                  'app/scripts/translations.js': ['app/po/*.po']
              }
          },
      },
      watch: {
        options: {
          livereload: true,
        },
        html: {
          files: ['app/index.html', 'app/partials/*.html'],
          tasks: ['nggettext_extract']
        },
        controllers: {
          files: ['app/scripts/controllers/*.js'],
          tasks: ['concat:controllers'],
        },
        services: {
          files: ['app/scripts/services/*.js'],
          tasks: ['concat:services'],
        },
        directives: {
          files: ['app/scripts/directives/*.js'],
          tasks: ['concat:directives'],
        },
        filters: {
          files: ['app/scripts/filters/*.js'],
          tasks: ['concat:filters'],
        },
        sass: {
          options: {
            livereload: false
          },
          files: ['app/css/scss/*.scss'],
          tasks: ['sass', 'concat:css'],
        },
        css: {
          files: [],
          tasks: ['-']
        }
      },
      docular: {
        docular_webapp_target: "docs",
        showDocularDocs: true,
        showAngularDocs: false,
        groups: [
          {
            groupId: "roomico",
            groupTitle: "Roomico",
            groupIcon: "icon-book",
            showSource: true,
            sections: [
              {
                id: "controllers",
                title: "Controllers",
                showSource: true,
                scripts: [
                  "app/scripts/controllers.js"
                ],
              },
              {
                id: "services",
                title: "Services",
                showSource: true,
                scripts: [
                  "app/scripts/services.js"
                ],
              },
              {
                id: "directives",
                title: "Dircetives",
                showSource: true,
                scripts: [
                  "app/scripts/directives.js"
                ],
              },
              {
                id: "filters",
                title: "Filters",
                showSource: true,
                scripts: [
                  "app/scripts/filters.js"
                ],
              }
            ]
          }
        ]
      }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-angular-gettext');
    grunt.loadNpmTasks('grunt-ngmin');
    grunt.loadNpmTasks('grunt-docular');

    grunt.registerTask('default', ['connect', 'nggettext_extract', 'nggettext_compile', 'sass', 'concat', 'watch']);
};
