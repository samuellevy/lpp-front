'use strict';

var gulp = require('gulp'),
	clean = require('gulp-clean'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	pug = require('gulp-pug'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync').create(),
	sourcemaps = require('gulp-sourcemaps'),
	autoprefixerOptions = {browsers: ['last 2 versions', '> 5%', 'Firefox ESR']};

var src = './app';


gulp.task('clean', function () {
    return gulp.src('./dist/', {read: false})
        .pipe(clean());
});

gulp.task('clean_build', function () {
    return gulp.src('./webroot/', {read: false})
        .pipe(clean());
});

gulp.task('image', () =>
    gulp.src(src + '/images/**')
        .pipe(gulp.dest('dist/images'))
);
gulp.task('fonts', () =>
    gulp.src(src + '/scss/fonts/**')
        .pipe(gulp.dest('dist/fonts'))
);

gulp.task('pages', function() {	
	gulp.src(src + '/*.pug')
	.pipe(pug({
		pretty: true
	}))
	.pipe(gulp.dest('./dist/'))
	.pipe(browserSync.stream());
});

gulp.task('sass', function () {
	return gulp.src(src + '/scss/*.scss')
	.pipe(sourcemaps.init())
	.pipe(sass({outputStyle: 'compressed'}))
	.on('error', function(err){
		browserSync.notify(err.message, 3000);
		this.emit('end');
	})
	.pipe(autoprefixer(autoprefixerOptions))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('./dist/css/'))
	.pipe(browserSync.stream());
});

gulp.task('scripts', function() {
  return gulp.src(src + '/js/*.js')
    .pipe(sourcemaps.init())
      .pipe(concat('main.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/js'))
	.pipe(browserSync.stream());
});

gulp.task('server', ['sass', 'pages','image', 'scripts', 'fonts'], function() {
	browserSync.init({
		server: "./dist"
	});
	gulp.watch(src + "/scss/**/*.scss", ['sass']);
	gulp.watch(src + '/**/*.pug', ['pages']);
	gulp.watch(src + '/images/', ['image']);
	gulp.watch(src + '/js/**.js', ['scripts']);
});


/** build */

gulp.task('build', ['clean_build', 'sass', 'pages','image', 'scripts', 'fonts'], function() {
	return gulp.src(['./dist/**'])
		.pipe(gulp.dest('../webroot/'));
});

gulp.task('watch-build', ['sass-build', 'image', 'scripts-build', 'fonts'], function() {
	gulp.watch(src + "/scss/**/*.scss", ['sass-build']);
	gulp.watch(src + '/**/*.pug', ['pages']);
	gulp.watch(src + '/images/', ['image']);
	gulp.watch(src + '/js/**.js', ['scripts-build']);
});

gulp.task('sass-build', function () {
	return gulp.src(src + '/scss/*.scss')
	.pipe(sourcemaps.init())
	.pipe(sass({outputStyle: 'compressed'}))
	.on('error', function(err){
		browserSync.notify(err.message, 3000);
		this.emit('end');
	})
	.pipe(autoprefixer(autoprefixerOptions))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('../webroot/css/'))
	.pipe(browserSync.stream());
});

gulp.task('scripts-build', function() {
  return gulp.src(src + '/js/*.js')
    .pipe(sourcemaps.init())
      .pipe(concat('main.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('../webroot/js'))
	.pipe(browserSync.stream());
});


//apagar
gulp.task('projs', function() {
	return gulp.src(src + '/js/*.js')
	  .pipe(sourcemaps.init())
		.pipe(concat('main.js'))
	  .pipe(sourcemaps.write())
	  .pipe(gulp.dest('../webroot/js'))
	  .pipe(browserSync.stream());
  });

gulp.task('prod', ['sass', 'pages','image', 'scripts', 'fonts'], function() {
	browserSync.init({
		server: "./dist"
	});
	gulp.watch(src + '/js/**.js', ['projs']);
});

gulp.task('default', ['server']);