
///////////////////////////
///// READ BEFORE USE /////
///////////////////////////
//
//Tasks:
//  gulp - build styles and js
//  gulp prod - build styles, js and minify it
//  gulp w - build styles,js and run watcher
//  gulp sprite - build sprites
///////////////////////////

'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var runSequence = require('run-sequence');
var spritesmith = require('gulp.spritesmith');

// build CSS
gulp.task('style', function(){
    gulp.src('scss/main.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('css/'))
});

// build JavaScript
gulp.task('js', function(){
    return gulp.src(['node_modules/jquery/dist/jquery.js',
                    'node_modules/waypoints/lib/jquery.waypoints.js',
                    'js/extra/*.js',
                    'js/common/*.js'])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('js/'));
});

// watch for changes and automatically build CSS/JS
gulp.task('watch', function () {
    watch('scss/**/*.scss', function(){
        gulp.start('style');
    });
    watch(['js/extra/*.js',
        'js/common/*.js'], function(){
        gulp.start('js');
    });
});

// build sprites

gulp.task('sprite', function () {
    var spriteData = gulp.src('img/sprites/*.png')
        .pipe(spritesmith({
            /* this whole image path is used in css background declarations */
            imgName: '../img/sprite.png',
            cssName: '_sprite.scss'
        }));
    spriteData.img.pipe(gulp.dest('img'));
    spriteData.css.pipe(gulp.dest('scss/theme'));
});

// production tasks

gulp.task('prod_style', function () {
    gulp.src('css/main.css')
        .pipe(cleanCSS({debug: true}, function(details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(gulp.dest('css/'));
});

gulp.task('prod_js', function () {
    return gulp.src('js/main.js')
        .pipe(uglify())
        .pipe(gulp.dest('js/'))
});

// build only static files
gulp.task('default', [
    'style',
    'js'
]);

// automatic build if changed are made
gulp.task('w', [
    'style',
    'js',
    'watch'
]);

gulp.task('prod', function() {
    runSequence(
        'js',
        'style',
        'prod_js',
        'prod_style'
    );
});
