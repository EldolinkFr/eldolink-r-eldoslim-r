module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    
    grunt.initConfig({
        concat: {
            options: {
                stripBanners: true
            },
            app_general_css: {
                src: [
            		'public/bundles/eldotools/css/bootstrap-modal.css',
            		'public/bundles/eldotools/css/animate.css',
            		'public/bundles/eldotools/css/custom.css',
            		'public/bundles/eldotools/css/notify.css'
                ],
                dest: 'public/css/t.css',
                nonull: true,
            },
            app_general_js : {
                src : [
            		'public/bundles/eldotools/js/js.cookie.js',
            		'public/bundles/eldotools/js/bootstrap.js',
            		'public/bundles/eldotools/js/plugins/bootstrap-notify/bootstrap-notify.js',
            		'public/bundles/eldotools/js/plugins/jquery-validate/jquery.validate.min.js',
            		'public/bundles/eldotools/js/plugins/bounceback.eldo.js',
            		'public/bundles/eldotools/js/general.js'
                ],
                dest: 'public/js/t.js',
                nonull: true,
            },
        },
        cssmin : {
            app_general_css:{
                src: 'public/css/t.css',
                dest: 'public/css/t.css'
            },
        },
        uglify : {
            app_general_js: {
                files: {
                    'public/js/t.js': ['public/js/t.js']
                }
            },
        },
    });

    grunt.registerTask('default', ['concat', 'cssmin', 'uglify']);
};