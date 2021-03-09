const {src, dest, series, watch}   = require('gulp');
const sass          = require('gulp-sass');
const csso          = require('gulp-csso');
const include       = require('gulp-file-include');
const htmlmin       = require('gulp-htmlmin');
const del           = require('del');
const concat        = require('gulp-concat');
const autoprefixer  = require('gulp-autoprefixer');
const sync          = require('browser-sync').create();
const sourcemaps    = require('gulp-sourcemaps');

function html() {
    return src('src/**.html')
        // .pipe(include({
        //     prefix: '@@'
        // }))
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(dest('dist'))
}
function scss() {
    return src('src/sass/main.sass')
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: ['./node_modules/']
        }))
        .pipe(autoprefixer())
        .pipe(csso())
        .pipe(sourcemaps.write())
        .pipe(dest('dist/css/'))
}

function img() {
    return src('src/img/**')
        .pipe(dest('dist/img'))
}

function scripts() {
    return src([
        'src/js/**.js',
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/slick-carousel/slick/slick.min.js',
        'node_modules/@fortawesome/fontawesome-free/js/all.min.js',
    ])
        .pipe(dest('dist/js/'))
}

function fonts() {
    return src([
        'src/fonts/*',
        'node_modules/slick-carousel/slick/fonts/*'
    ])
        .pipe(dest('dist/css/fonts/'))
}

function clear() {
    return del('dist/');
}

function serve() {
    sync.init({
        server: './dist/'
    })

    watch('src/**.html', series(html)).on('change', sync.reload)
    watch('src/js/**/*.js', series(scripts)).on('change', sync.reload)
    watch('src/sass/**/*.sass', series(scss)).on('change', sync.reload)
    watch('src/img/', series(img)).on('change', sync.reload)
}

exports.build = series(clear, img, fonts, scss, scripts, html)
exports.serve = series(clear, img, fonts, scss, scripts, html, serve)
exports.clear = clear;
