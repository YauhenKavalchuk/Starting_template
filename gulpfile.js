var gulp = require("gulp"),
		connect = require("gulp-connect"),
		opn = require("opn"),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    bourbon = require('node-bourbon'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    rename = require("gulp-rename");

// Server
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true,
    port: 8888
  });
  opn("http://localhost:8888");
});

// HTML
gulp.task('html', function () {
  gulp.src('./app/*.html')
    .pipe(connect.reload());
});

// CSS
gulp.task('scss', function () {
  gulp.src('./app/sass/*.scss')
    .pipe(sass({includePaths: require('node-bourbon').includePaths}).on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['last 5 versions'], cascade: false}))
    //.pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('app/css'))
    .pipe(connect.reload());
});

// JS
gulp.task('js', function() {
  return gulp.src('./app/js/common.js')
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/js/'));
});

// Watch
gulp.task('watch', function () {
  gulp.watch(['./app/*.html'], ['html']),
  gulp.watch(['./app/sass/*.scss'], ['scss']),
  gulp.watch(['./app/js/*.js'], ['js']);
});

// Default
gulp.task('default', ['connect', 'watch']);