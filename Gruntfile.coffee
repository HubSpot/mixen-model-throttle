module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")
    coffee:
      compile:
        files:
          'throttle.js': 'throttle.coffee'
          'spec/throttle.spec.js': 'spec/throttle.spec.coffee'

    watch:
      coffee:
        files: ['throttle.coffee', 'spec/throttle.spec.coffee']
        tasks: ["coffee", "uglify"]

    uglify:
      options:
        banner: "/*! <%= pkg.name %> <%= pkg.version %> */\n"

      dist:
        src: 'throttle.js'
        dest: 'throttle.min.js'

    jasmine:
      options:
        specs: ['spec/throttle.spec.js']
      src: [
        'spec/vendor/mixen-0.4.7/mixen.js',
        'spec/vendor/underscore-1.5.1/underscore.js',
        'spec/vendor/backbone-1.0.0/backbone.js',
        'throttle.js'
      ]

  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-jasmine'

  grunt.registerTask 'default', ['coffee', 'uglify']
  grunt.registerTask 'build', ['coffee', 'uglify', 'jasmine']
  grunt.registerTask 'test', ['coffee', 'uglify', 'jasmine']
