const gulp       = require('gulp'),
      concat     = require('gulp-concat'),
      uglify     = require('gulp-uglify'),
      prefixer   = require('gulp-autoprefixer'),
      sourcemaps = require('gulp-sourcemaps'),
      plumber    = require('gulp-plumber'),
      sass       = require('gulp-sass'),
      cleancss   = require('gulp-clean-css'),
      imagemin   = require('gulp-imagemin'),
      babelify   = require('babelify'),
      browserify = require('browserify'),
      source     = require('vinyl-source-stream'),
      buffer     = require('vinyl-buffer');

/**
 * Base paths
 */
const Paths = {
    js : {
        src   : 'assets/js/src/index.js',
        dist  : 'assets/js',
        watch : 'assets/js/src/**/*.js'
    },
    sass : {
        src   : 'assets/scss/style.scss',
        dist  : 'assets/css',
        watch : 'assets/scss/**/*.scss'
    },
    img : {
        src  : 'assets/img/src/*',
        dist : 'assets/img'
    }
};

/**
 * Task definitions
 */
function js() {
    const bundler = browserify({
        entries: [Paths.js.src],
        debug: true,
    }).transform(babelify, {
        presets: ["@babel/preset-env"]
    });

    // Browserify requires being wrapped to work with gulp.
    return bundler.bundle()
        .pipe(source('app.min.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        // .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(Paths.js.dist));
}

function css() {
    return gulp.src(Paths.sass.src)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(concat('app.min.css'))
        .pipe(prefixer())
        .pipe(cleancss())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(Paths.sass.dist));
}

function img() {
    return gulp.src(Paths.img.src)
        .pipe(imagemin())
        .pipe(gulp.dest(Paths.img.dist));
}

function watch() {
    gulp.watch(Paths.js.watch, js);
    gulp.watch(Paths.sass.watch, css);
    gulp.watch(Paths.img.src, img);
}

/**
 * Module exports
 */
module.exports = {
    default: gulp.parallel(js, css, img),
    watch,
    js,
    css,
    img,
};
