const gulp       = require('gulp'),
      concat     = require('gulp-concat'),
      uglify     = require('gulp-uglify'),
      prefixer   = require('gulp-autoprefixer'),
      sourcemaps = require('gulp-sourcemaps'),
      plumber    = require('gulp-plumber'),
      sass       = require('gulp-sass'),
      cleancss   = require('gulp-clean-css'),
      imagemin   = require('gulp-imagemin');

/**
 * Base paths
 */
const Paths = {
    js : {
        src  : 'assets/js/src/*.js',
        dist : 'assets/js'
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
    return gulp.src(Paths.js.src)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(uglify())
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
    gulp.watch(Paths.js.src, js);
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
