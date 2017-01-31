const gulp       = require('gulp'),
      watch      = require('gulp-watch'),
      concat     = require('gulp-concat'),
      uglify     = require('gulp-uglify'),
      prefixer   = require('gulp-autoprefixer'),
      sourcemaps = require('gulp-sourcemaps'),
      plumber    = require('gulp-plumber'),
      sass       = require('gulp-sass'),
      cssnano    = require('gulp-cssnano'),
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
 * Gulp tasks
 */
const tasks = {

    js: function() {
        gulp.src(Paths.js.src)
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(concat('site.min.js'))
            .pipe(uglify())
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(Paths.js.dist));
    },

    sass: function() {
        gulp.src(Paths.sass.src)
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(concat('site.min.css'))
            .pipe(prefixer())
            .pipe(cssnano())
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(Paths.sass.dist));
    },

    img: function() {
        gulp.src(Paths.img.src)
            .pipe(imagemin())
            .pipe(gulp.dest(Paths.img.dist));
    },

    watch: function() {
        gulp.watch(Paths.js.src, ['js']);
        gulp.watch(Paths.sass.watch, ['sass']);
        gulp.watch(Paths.img.src, ['img']);
    },

    default: ['js', 'sass', 'img']

};

for (var task in tasks) {
    gulp.task(task, tasks[task]);
}