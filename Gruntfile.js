module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bowercopy: {
            options: {
                srcPrefix: 'app/Resources/lib',
                destPrefix: 'web/assets'
            },
            scripts: {
                files: {
                    'web/assets/js/utils.js': 'intl-tel-input/build/js/utils.js',
                }
            },
            fonts: {
                files: {
                    'fonts': ['font-awesome/fonts', 'bootstrap/fonts'],
                    'img': 'intl-tel-input/build/img'
                }
            }
        },
        concat: {
            options: {
                stripBanners: true
            },
        },
        cssmin : {
            errors:{
                src: 'web/css/errors.css',
                dest: 'web/assets/css/errors.min.css'
            }
        },
        uglify : {
        },
    });

    grunt.registerTask('default', ['bowercopy', 'cssmin']);
};