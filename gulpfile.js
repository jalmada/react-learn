"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); //Local Devserver
var open = require('gulp-open'); //Open Url in a webbrowser

var browserify = require('browserify'); //Bundle JS
var reactify = require('reactify'); // Transforms JSX to JS
var source = require('vinyl-source-stream'); //Use conventional text streams with gulp

var concat = require('gulp-concat'); // concatenates files
var lint = require('gulp-eslint'); // lint


var config= {
  port:9005,
  devBaseUrl: 'http://localhost',
  paths:{
    html:'./src/*.html',
    js: './src/**/*.js',
    images: './src/images/*',
    css: [
      'node_modules/bootstrap/dist/css/bootstrap.min.css',
      'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
    ],
    dist:'./dist',
    mainJS:'./src/main.js'
  }
};
//Start a local dev server
gulp.task('connect',function(){
  connect.server({
    root: ['dist'],
    port: config.port,
    base: config.devBaseUrl,
    livereload: true
  });

});


gulp.task('open', ['connect'], function(){
  gulp.src('dist/index.html')
    .pipe(open({uri: config.devBaseUrl + ':' + config.port + '/'}));
});

gulp.task('html', function(){
  gulp.src(config.paths.html)
    .pipe(gulp.dest(config.paths.dist))
    .pipe(connect.reload());
});

gulp.task('js', function(){
  browserify(config.paths.mainJS)
    .transform(reactify)
    .bundle()
    .on('error',console.error.bind(console))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(config.paths.dist + '/scripts'))
    .pipe(connect.reload());
});

gulp.task('css', function(){
  gulp.src(config.paths.css)
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('images', function(){
  gulp.src(config.paths.images)
    .pipe(gulp.dest(config.paths.dist + '/images'))
    .pipe(connect.reload());

  gulp.src('./src/favicon.ico')
    .pipe(gulp.dest(config.paths.dist));
});

gulp.task('lint', function(){
  return gulp.src(config.paths.js)
    .pipe(lint())
    .pipe(lint.format())
    .pipe(lint.failAfterError());
});

gulp.task('watch', function(){
  gulp.watch(config.paths.html, ['html']);
  gulp.watch(config.paths.js, ['js','lint']);
});

gulp.task('default', ['html', 'js', 'css', 'images', 'lint', 'connect','watch']);
