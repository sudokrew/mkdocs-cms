var gulp       = require('gulp');
var sass       = require('gulp-sass');
var uglify     = require('gulp-uglify');
var rename     = require('gulp-rename');
var nodemon    = require('gulp-nodemon');
var plumber    = require('gulp-plumber');
var minifyCSS  = require('gulp-minify-css');
var imagemin   = require('gulp-imagemin');
var livereload = require('gulp-livereload');
var prefix     = require('gulp-autoprefixer');

var custom = {
  src: './theme_assets/',
  dest: './mkdocs/custom_theme/'
};

var app = {
  src: './assets/',
  dest: './public/'
};

gulp.task('sass', function() {
  Sass(custom);
  Sass(app);
});


gulp.task('img', function () {
  Img(custom);
  Img(app);
});


gulp.task('fonts', function() {
  Fonts(custom);
  Fonts(app);
});


gulp.task('js', function() { 
  Js(custom);
  Js(app);

  gulp
  .src([
    './bower_components/jquery/dist/jquery.js',
    './bower_components/bootstrap-sass/assets/javascripts/bootstrap.js'
  ])
  .pipe(uglify())
  .pipe(gulp.dest(custom.dest + 'js/libs'));

  gulp
  .src([
    './bower_components/jquery/dist/jquery.js',
    './bower_components/jquery-ui/jquery-ui.js',
    './bower_components/jquery-ui/ui/sortable.js',
    './bower_components/metisMenu/dist/metisMenu.js',
    './bower_components/trumbowyg/dist/trumbowyg.js',
    './bower_components/nestedSortable/jquery.ui.nestedSortable.js',
    './bower_components/bootstrap-switch/dist/js/bootstrap-switch.js',
    './bower_components/bootstrap-select/dist/js/bootstrap-select.js',
    './bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
    './bower_components/bootstrap-sass/assets/javascripts/bootstrap/collapse.js'
  ])
  .pipe(uglify())
  .pipe(gulp.dest(app.dest +'js/libs'));
});


gulp.task('watch', function() {
  livereload.listen();
  Watch(custom);
  Watch(app);
  
  gulp.watch(['./public/**/*', './templates/**/*']).on('change', function(file) {
    livereload.changed(file.path);
  });
});


gulp.task('serve', function() {
  nodemon({ script: 'app.js', ext: 'js', watch: ['./app.js', './api.js', './lib/*.js', './helpers/*.js'] })
  .on('restart', function() {
    console.log('Restarted! ' + require('moment')(new Date()).calendar());
  })
});


gulp.task('build', ['sass', 'img', 'fonts', 'js']);
gulp.task('default', ['build', 'serve', 'watch']);



function Sass(path) {
  return gulp
        .src(path.src +'sass/main.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(prefix())
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifyCSS())
        .pipe(gulp.dest(path.dest +'css'))
        .pipe(livereload());
}

function Img(path) {
  return gulp
        .src(path.src +'img/**/*')
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest(path.dest +'img'));
}

function Fonts(path) {
  return gulp
        .src(path.src +'fonts/**/*')
        .pipe(gulp.dest(path.dest +'fonts'));
}

function Js(path) {
  return gulp
        .src(path.src +'js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(path.dest +'js'));
}

function Watch(path) {
  gulp.watch(path.src +'img/**/*', ['img']);
  gulp.watch(path.src +'js/**/*.js', ['js']);
  gulp.watch(path.src +'sass/**/*.scss', ['sass']);
}