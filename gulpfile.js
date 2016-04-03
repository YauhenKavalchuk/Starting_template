/*******************************************************************************\
		1.	DEPENDENCIES
\*******************************************************************************/

var gulp = require("gulp"),															// gulp core
		sass = require('gulp-sass'),												// sass compiler
		rename = require("gulp-rename"),										// rename files
		autoprefixer = require('gulp-autoprefixer'),				// sets missing browserprefixes
		browserSync = require('browser-sync').create();			// inject code to all devices

/*******************************************************************************\
		2.	BROWSERSYNC (LOCAL SERVEVR)
\*******************************************************************************/

gulp.task('default', ['watch'], function() {						// files to inject
	browserSync.init({
		server: { baseDir: "./app/" }												// base dir
	});
});

/*******************************************************************************\
		3.	WATCHER (WATCHING FILE CHANGES)
\*******************************************************************************/

gulp.task('watch', function () {
	gulp.watch(['./app/*.html'], ['html']);								// watching changes in HTML
	gulp.watch(['./app/sass/*.scss'], ['scss']);					// watching changes in SASS
	gulp.watch(['./app/ui/js/*.js'], ['js']);							// watching changes in JS
});

/*******************************************************************************\
		4.	HTML TASKS
\*******************************************************************************/

gulp.task('html', function () {
	gulp.src('./app/index.html')													// get the files
		.pipe(gulp.dest('./app/'))													// where to put the file
		.pipe(browserSync.stream());												// browsersync stream
});

/*******************************************************************************\
		5.	SASS TASKS
\*******************************************************************************/

gulp.task('scss', function () {
	gulp.src('./app/sass/*.scss')													// get the files
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({browsers: ['last 3 versions'], cascade: true}))
		.pipe(gulp.dest('app/ui/css'))											// where to put the file
		.pipe(browserSync.stream());												// browsersync stream
});

/*******************************************************************************\
		6.	JS TASKS
\*******************************************************************************/

gulp.task('js', function() {
	return gulp.src('./app/ui/js/common.js')							// get the files
		.pipe(browserSync.stream()); 												// browsersync stream
});
