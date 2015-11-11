var gulp       = require('gulp');
var sass       = require('gulp-sass');
var concat     = require('gulp-concat');
var uglify     = require('gulp-uglify');
var rename     = require('gulp-rename');
var nodemon    = require('gulp-nodemon');
var plumber    = require('gulp-plumber');
var imagemin   = require('gulp-imagemin');
var minifyCSS  = require('gulp-minify-css');
var livereload = require('gulp-livereload');
var prefix     = require('gulp-autoprefixer');

var app = {
  src: './app/assets/',
  dest: './public/'
};

gulp.task('sass', function() {
  gulp
  .src(app.src +'sass/main.scss')
  .pipe(plumber())
  .pipe(sass())
  .pipe(prefix())
  .pipe(rename({ suffix: '.min' }))
  .pipe(minifyCSS())
  .pipe(gulp.dest(app.dest +'css'))
  .pipe(livereload());
});


gulp.task('img', function () {
  gulp
  .src(app.src +'img/**/*')
  .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
  .pipe(gulp.dest(app.dest +'img'));
});


gulp.task('fonts', function() {
  gulp
  .src(app.src +'fonts/**/*')
  .pipe(gulp.dest(app.dest +'fonts'));
});


gulp.task('editor', function() {
  gulp
  .src([
    app.src +'simpleMDE/codemirror/codemirror.js',
    app.src +'simpleMDE/codemirror/continuelist.js',
    app.src +'simpleMDE/codemirror/fullscreen.js',
    app.src +'simpleMDE/codemirror/markdown.js',
    app.src +'simpleMDE/codemirror/overlay.js',
    app.src +'simpleMDE/codemirror/gfm.js',
    app.src +'simpleMDE/codemirror/xml.js',
    app.src +'simpleMDE/typo.js',
    app.src +'simpleMDE/spell-checker.js',
    app.src +'simpleMDE/marked.js',
    app.src +'simpleMDE/simplemde.js'
  ])
  .pipe(concat('simplemde.js'))
  .pipe(uglify())
  .pipe(gulp.dest(app.dest +'js/libs'))
});


gulp.task('js', function() {
  gulp
  .src(app.src +'js/**/*.js')
  .pipe(uglify())
  .pipe(gulp.dest(app.dest +'js'));

  gulp
  .src([
    './bower_components/jquery/dist/jquery.js',
    './bower_components/jquery-ui/jquery-ui.js',
    './bower_components/jquery-ui/ui/sortable.js',
    './bower_components/metisMenu/dist/metisMenu.js',
    './bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
    './bower_components/bootstrap-sass/assets/javascripts/bootstrap/collapse.js'
  ])
  .pipe(uglify())
  .pipe(gulp.dest(app.dest +'js/libs'));
});


gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(app.src +'img/**/*', ['img']);
  gulp.watch(app.src +'js/**/*.js', ['js']);
  gulp.watch(app.src +'sass/**/*.scss', ['sass']);

  gulp.watch(['./public/**/*', './templates/**/*']).on('change', function(file) {
    livereload.changed(file.path);
  });
});


gulp.task('serve', function() {
  nodemon({ script: 'app.js', ext: 'js', watch: ['./app.js', './api.js', './lib/*.js', './helpers/*.js'] })
  .on('restart', function() {
    console.log('Restarted! ' + new Date());
  })
});


gulp.task('build', ['sass', 'img', 'fonts', 'js', 'editor']);
gulp.task('default', ['build', 'serve', 'watch']);

