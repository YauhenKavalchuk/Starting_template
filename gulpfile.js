var gulp = require("gulp"),
		opn = require("opn"),
		sass = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		bourbon = require('node-bourbon'),
		uglify = require('gulp-uglify'),
		minifyCss = require('gulp-minify-css'),
		rename = require("gulp-rename"),
		wiredep = require('wiredep').stream,
		gulpif = require('gulp-if'),
		clean = require('gulp-clean'),
		useref = require('gulp-useref'),
		browserSync = require('browser-sync').create();

// Server
gulp.task('connect', ['watch'], function() {
	 browserSync.init({
		server: {
			baseDir: "./app/"
		}
	});
});

// Watch
gulp.task('watch', function () {
	gulp.watch(['./app/*.html'], ['html']),
	gulp.watch(['./app/sass/*.scss'], ['scss']),
	gulp.watch(['./app/js/*.js'], ['js']);
});

// HTML
gulp.task('html', function () {
	gulp.src('./app/index.html')
		.pipe(wiredep({
			directory: "./app/bower/"
		}))
		.pipe(gulp.dest('./app/'))
		.pipe(browserSync.stream());
});

// CSS
gulp.task('scss', function () {
	gulp.src('./app/sass/*.scss')
		.pipe(sass({includePaths: require('node-bourbon').includePaths}).on('error', sass.logError))
		.pipe(autoprefixer({browsers: ['last 5 versions'], cascade: false}))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.stream());
});

// JS
gulp.task('js', function() {
	return gulp.src('./app/js/common.js')
		.pipe(browserSync.stream()); 
});

// Images
gulp.task('images', function () {
		return gulp.src('./app/img/**/*')
				.pipe(gulp.dest('dist/img'))
});

// Fonts
gulp.task('fonts', function () {
		return gulp.src('./app/fonts/**/*')
				.pipe(gulp.dest('dist/fonts'))
});

// Libs
gulp.task('libs', function () {
		return gulp.src('./app/libs/**/*')
				.pipe(gulp.dest('dist/libs'))
});

// Clean
gulp.task('clean', function () {
		return gulp.src('dist', {read: false})
				.pipe(clean());
});

// Build
gulp.task('build', ['clean'], function () {
		gulp.start('images');
		gulp.start('fonts');
		gulp.start('libs');
		var assets = useref.assets();
		 return gulp.src('app/*.html')
				.pipe(assets)
				.pipe(gulpif('*.js', uglify()))
				.pipe(gulpif('*.css', minifyCss({compatibility: 'ie8'})))
				.pipe(assets.restore())
				.pipe(useref())
				.pipe(gulp.dest('./dist'));
});

// Local
gulp.task('default', ['connect', 'watch']);