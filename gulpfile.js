'use strict';

/*******************************************************************************\
		1.	DEPENDENCIES
\*******************************************************************************/

var gulp = require("gulp"),																// gulp core
		sass = require('gulp-sass'),													// sass compiler
		gulpif = require('gulp-if'),													// conditionally run a task
		jade = require('gulp-jade'),													// jade compiler							
		clean = require('gulp-clean'),												// removing files and folders
		uglify = require('gulp-uglify'),											// uglifies the js
		rename = require("gulp-rename"),											// rename files
		useref = require('gulp-useref'),											// parse build blocks in HTML files to replace references
		bourbon = require('node-bourbon'),										// bourbon libruary
		prettify = require('gulp-prettify'),									// prettify, format, beautify HTML
		wiredep = require('wiredep').stream,									// bower dependencies to your source code
		minifyCss = require('gulp-minify-css'),								// minify the css files
		autoprefixer = require('gulp-autoprefixer'),					// sets missing browserprefixes
		browserSync = require('browser-sync').create();				// inject code to all devices

/*******************************************************************************\
		2.	BROWSERSYNC (LOCAL SERVEVR)
\*******************************************************************************/

gulp.task('connect', ['jade', 'watch'], function() {			// files to inject
	browserSync.init({
		server: {
			baseDir: "./app/"																		// base dir
		}
	});
});

/*******************************************************************************\
		2.	COMPILE JADE IN TO HTML
\*******************************************************************************/

gulp.task('jade', function() {
  gulp.src('./app/template/pages/*.jade')
    .pipe(jade())
    .on('error', log)
    .pipe(prettify({indent_size: 2}))
    .pipe(gulp.dest('./app/'))
    .pipe(browserSync.stream());
});

/*******************************************************************************\
		3.	WATCHER (WATCHING FILE CHANGES)
\*******************************************************************************/

gulp.task('watch', function () {
	gulp.watch(['./app/template/**/*.jade'], ['jade']);			// watching changes in JADE
	gulp.watch('bower.json', ['wiredep']);									// watching changes in Wiredep
	gulp.watch(['./app/sass/*.scss'], ['scss']);						
	gulp.watch(['./app/js/*.js'], ['js']);
});

/*******************************************************************************\
		4.	WIREDEP TASKS
\*******************************************************************************/

gulp.task('wiredep', function () {
	gulp.src('./app/template/pages/*.jade')														
		.pipe(wiredep({
			ignorePath: /^(\.\.\/)*\.\./														 
		}))
		.pipe(gulp.dest('./app/template/pages/'))																											
});

/*******************************************************************************\
		5.	SASS TASKS
\*******************************************************************************/

gulp.task('scss', function () {
	gulp.src('./app/sass/*.scss')														// get the files
		.pipe(sass({includePaths: require('node-bourbon').includePaths}).on('error', sass.logError))
		.pipe(autoprefixer({browsers: ['last 3 versions'], cascade: false}))
		.pipe(gulp.dest('app/css'))														// where to put the file
		.pipe(browserSync.stream());													// browsersync stream
});

/*******************************************************************************\
		6.	JS TASKS
\*******************************************************************************/

gulp.task('js', function() {
	return gulp.src('./app/js/common.js')										// get the files
		.pipe(browserSync.stream()); 													// browsersync stream
});

/*******************************************************************************\
		7.	IMAGES TASKS
\*******************************************************************************/

gulp.task('images', function () {
	return gulp.src('./app/img/**/*')												// get the files
		.pipe(gulp.dest('dist/img'))													// where to put the file
});

/*******************************************************************************\
		8.	FONTS TASKS
\*******************************************************************************/

gulp.task('fonts', function () {
	return gulp.src('./app/fonts/**/*')											// get the files
		.pipe(gulp.dest('dist/fonts'))												// where to put the file
});

/*******************************************************************************\
		9.	LIBS TASKS (PERSONAL DEVELOPER LIBS)
\*******************************************************************************/

gulp.task('libs', function () {
	return gulp.src('./app/libs/**/*')											// get the files
		.pipe(gulp.dest('dist/libs'))													// where to put the file
});

/*******************************************************************************\
		10.	EXTRASS TASKS (ROOT FILES, EXCEPT HTML-FILES)
\*******************************************************************************/

gulp.task('extrass', function () {
	return gulp.src([																				// get the files
		'app/*.*',
		'!app/*.html'																					// exept '.html'
	]).pipe(gulp.dest('dist'))															// where to put the file														
});

/*******************************************************************************\
		11.	BUILD TASKS
\*******************************************************************************/

// Clean
gulp.task('clean', function () {
	return gulp.src('dist', {read: false})
		.pipe(clean());																				// clean dir
});

// Build
gulp.task('build', ['clean'], function () {
	gulp.start('images');																		// images task
	gulp.start('fonts');																		// fonts task
	gulp.start('libs');																			// libs task
	gulp.start('extrass');
	var assets = useref.assets();
		return gulp.src('app/*.html')
			.pipe(assets)
			.pipe(gulpif('*.js', uglify()))
			.pipe(gulpif('*.css', minifyCss({compatibility: 'ie8'})))
			.pipe(assets.restore())
			.pipe(useref())
			.pipe(gulp.dest('./dist'));
});

/*******************************************************************************\
		12.	DEFAULT TASKS
\*******************************************************************************/

gulp.task('default', ['connect', 'watch']);

/*******************************************************************************\
		13.	DEBUGING FUNCTION
\*******************************************************************************/

var log = function(error) {
	console.log([
		'',
		"-----------ERROR MESSAGE START----------",
		("[" + error.name + " in " + error.plugin + "]"),
		error.message,
		"-----------ERROR MESSAGE END----------",
		''
	].join('\n'));
	this.end();
}