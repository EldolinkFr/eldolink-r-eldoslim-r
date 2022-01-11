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
            app_general_css: {
                src: [
            		'web/bundles/eldotools/css/bootstrap-modal.css',
            		'web/bundles/eldotools/css/animate.css',
            		'web/bundles/eldotools/css/custom.css',
            		'web/bundles/eldotools/css/notify.css'
                ],
                dest: 'web/css/t.css',
                nonull: true,
            },
            app_general_js : {
                src : [
            		'web/bundles/eldotools/js/jquery.cookie.js',
            		'web/bundles/eldotools/js/bootstrap.js',
            		'web/bundles/eldotools/js/plugins/bootstrap-notify/bootstrap-notify.js',
            		'web/bundles/eldotools/js/plugins/jquery-validate/jquery.validate.min.js',
            		'web/bundles/eldotools/js/plugins/bounceback.eldo.js',
            		'web/bundles/eldotools/js/general.js'
                ],
                dest: 'web/js/t.js',
                nonull: true,
            },
        },
        cssmin : {
            errors:{
                src: 'web/css/errors.css',
                dest: 'web/assets/css/errors.min.css'
            },
            app_general_css:{
                src: 'web/css/t.css',
                dest: 'web/css/t.css'
            },
        },
        uglify : {
            app_general_js: {
                files: {
                    'web/js/t.js': ['web/js/t.js']
                }
            },
        },
    });

    grunt.registerTask('default', ['bowercopy', 'concat', 'cssmin', 'uglify']);
};