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
            app_pdv_css : {
                src : [
                    'app/Resources/lib/bootstrap/dist/css/bootstrap.css',
            		'web/bundles/eldopages/js/lib/video-js/video-js.css',
                    'web/bundles/eldopages/css/topbar.css',
                    'web/bundles/eldopages/css/score.css',
                    'web/bundles/eldopages/css/notify.css',
                    'web/bundles/eldopages/css/animate.css',
            		'web/bundles/eldopages/css/bootstrap-social.css',
            		'app/Resources/lib/font-awesome/css/font-awesome.css',
            		'web/bundles/eldopages/js/plugins/magnific-popup/magnific-popup.css',
                    'app/Resources/lib/intl-tel-input/build/css/intlTelInput.css',
                    'web/bundles/eldopages/css/owl.carousel.css',
                    'web/bundles/eldopages/css/owl.theme.css',
                    'web/bundles/eldopages/css/owl.transitions.css',
                    'web/bundles/eldomain/css/cookie_consent.css',
            		'web/bundles/eldopages/css/cookie_consent.css'
                ],
                dest: 'Resources/public/assets/css/app_pdv.css',
                nonull: true,
            },
        },
        cssmin : {
            app_pdv_css:{
                src: 'web/assets/css/app_pdv.css',
                dest: 'web/assets/css/app_pdv.min.css'
            },
            errors:{
                src: 'web/css/errors.css',
                dest: 'web/assets/css/errors.min.css'
            }
        },
        uglify : {
        },
    });

    grunt.registerTask('generateLocales', function() {
        var locales = ['en', 'fr', 'es', 'de', 'it', 'pt'];

        for ( var key in locales ) {
            var thisLocale = locales[key];

            grunt.config( 'concat.app_pdv_js_'+thisLocale, {
                src : [
            		'app/Resources/lib/jquery/jquery.js',
            		'app/Resources/lib/jquery.cookie/jquery.cookie.js',
            		'app/Resources/lib/bootstrap/dist/js/bootstrap.js',
            		'web/bundles/eldopages/js/plugins/jquery.countdown.min.js',
            		'web/bundles/eldopages/js/plugins/jquery-lazy/jquery.lazy.js',
            		'web/bundles/eldopages/js/plugins/jquery-validate/jquery.validate.min.js',
            		'web/bundles/eldopages/js/plugins/jquery-validate/localization/messages_'+thisLocale+'.js',
            		'web/bundles/eldopages/js/plugins/magnific-popup/jquery.magnific-popup.min.js',
            		'web/bundles/eldopages/js/plugins/intlTelInput/js/intlTelInput.min.js',
            		'web/bundles/eldopages/js/plugins/bootstrap-notify/bootstrap-notify.js',
            		'web/bundles/eldopages/js/plugins/owl.carousel.min.js',
            		'web/bundles/eldopages/js/custom.js',
            		'web/bundles/eldomain/js/cookie_consent.js',
            		'web/bundles/eldotools/js/plugins/bounceback.eldo.js',
            		'web/bundles/eldotools/js/general.js'
                ],
                dest: 'Resources/public/assets/js/app_pdv.'+thisLocale+'.js'
            });
            grunt.task.run( 'concat:app_pdv_js_'+thisLocale );

            grunt.config( 'uglify.app_pdv_js_'+thisLocale, {
                files: {
            		['Resources/public/assets/js/app_pdv.'+thisLocale+'.min.js']: ['Resources/public/assets/js/app_pdv.'+thisLocale+'.js']
                }
            });
            grunt.task.run( 'uglify:app_pdv_js_'+thisLocale );
        }
    });

    grunt.registerTask('default', ['bowercopy', 'concat', 'cssmin', 'generateLocales']);
};