/*********************************************/
    /*DEPENDENCIES*/
/*********************************************/

var gulp = require("gulp"),                             // gulp core
    sass = require('gulp-sass'),						// sass compiler
    gulpif = require('gulp-if'),						// conditionally run a task
    clean = require('gulp-clean'),                      // removing files and folders
    uglify = require('gulp-uglify'),					// uglifies the js
    rename = require("gulp-rename"),					// rename files
    useref = require('gulp-useref'),					// parse build blocks in HTML files to replace references
    minifyCss = require('gulp-minify-css'),             // minify the css files
    autoprefixer = require('gulp-autoprefixer'),		// sets missing browserprefixes
    browserSync = require('browser-sync').create(),     // inject code to all devices
    imagemin = require('gulp-imagemin'),				// minify images
    pngquant = require('imagemin-pngquant'),            // minify png-format images
    spritesmith = require('gulp.spritesmith');          // create sprites

/*********************************************/
    /*BROWSERSYNC (LOCAL SERVEVR)*/
/*********************************************/

gulp.task('default', ['watch'], function () {           // start server
    browserSync.init({
        server: {baseDir: "./app/"}                     // base dir
    });
});

/*********************************************/
    /*WATCHER (WATCHING FILE CHANGES)*/
/*********************************************/

gulp.task('watch', function () {
    gulp.watch(['./app/**/*.html'], ['html']);          // watching changes in HTML
    gulp.watch(['./app/sass/**/*.scss'], ['sass']);     // watching changes in SASS
    gulp.watch(['./app/js/**/*.js'], ['js']);           // watching changes in JS
    gulp.watch(['./app/img/sprite/*.*'], ['sprite']);   // watching changes in IMAGES
});

/*********************************************/
    /*HTML TASKS*/
/*********************************************/

gulp.task('html', function () {
    gulp.src('./app/index.html')						// get the files
        .pipe(gulp.dest('./app/'))                      // where to put the file
        .pipe(browserSync.stream());					// browsersync stream
});

/*********************************************/
    /*SASS TASKS*/
/*********************************************/

gulp.task('sass', ['sprite'], function () {
    gulp.src('./app/sass/**/*')                         // get the files
        .pipe(sass().on('error', sass.logError))        // add prefixes
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: true
        }))
        .pipe(gulp.dest('app/css'))                     // where to put the file
        .pipe(browserSync.stream());					// browsersync stream
});

/*********************************************/
    /*JS TASKS*/
/*********************************************/

gulp.task('js', function () {
    return gulp.src('./app/js/**/*.js')                 // get the files
        .pipe(browserSync.stream());                    // browsersync stream
});

/*********************************************/
    /*IMAGES TASKS*/
/*********************************************/

gulp.task('sprite', function(done) {
    buildSprite().on('end', done);
});

gulp.task('images', ['sprite'], function() {
    return gulp.src('./app/img/**/*')                   // get the files
        .pipe(imagemin({                                // minify images
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }, {
                cleanupIDs: false
            }],
            use: [pngquant({                            // minify png-format images
                quality: '50-70',
                speed: 4
            })],
            interlaced: true
        }))
        .pipe(gulp.dest('dist/img'));                   // where to put the files
});

/*********************************************/
    /*FONTS TASKS*/
/*********************************************/

gulp.task('fonts', function () {
    return gulp.src('./app/fonts/**/*')                 // get the files
        .pipe(gulp.dest('dist/fonts'));                 // where to put the files
});

/*********************************************/
    /*LIBS TASKS (PERSONAL DEVELOPER LIBS)*/
/*********************************************/

gulp.task('libs', function () {
    return gulp.src('./app/libs/**/*')                  // get the files
        .pipe(gulp.dest('dist/libs'));                  // where to put the files
});

/*********************************************/
    /*EXTRASS TASKS (ROOT FILES, EXCEPT HTML)*/
/*********************************************/

gulp.task('extrass', function () {
    return gulp.src([                                   // get the files
        'app/*.*',
        '!app/*.html'                                   // except '.html'
    ]).pipe(gulp.dest('dist'));                         // where to put the files
});

/*********************************************/
    /*BUILD TASKS*/
/*********************************************/

gulp.task('clean', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());                                 // clean dir
});

gulp.task('build', ['clean'], function () {
    gulp.start('images');                               // images task
    gulp.start('fonts');                                // fonts task
    gulp.start('libs');                                 // libs task
    gulp.start('extrass');                              // extras task
    var assets = useref.assets();
    return gulp.src('app/*.html')
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))                 // uglify js-files
        .pipe(gulpif('*.css', minifyCss()))             // minify css-files
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('./dist'));                     // where to put the files
});

/*********************************************/
    /*FUNCTIONS*/
/*********************************************/

function buildSprite() {
    var spriteData = gulp.src('./app/img/sprite/*.*')
        .pipe(spritesmith({
            imgName: '../img/sprite.png',
            cssName: '_sprite.scss',
            cssFormat: 'scss',
            padding: 5
        }));

    spriteData.img.pipe(gulp.dest('./app/img'));
    return spriteData.css.pipe(gulp.dest('./app/sass/components'));
}
