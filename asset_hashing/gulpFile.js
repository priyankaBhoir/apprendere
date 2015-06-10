(function(){
  var gulp  = require('gulp');
  var $     = require('gulp-load-plugins')({lazy:false});
 var es = require('event-stream'),
    runSeq = require('run-sequence'),
    hash = require('gulp-hash'),
    extend = require('gulp-extend'); // See https://github.com/adamayres/gulp-extend,
    references = require('gulp-hash-references');


$.livereload();
$.livereload.listen();

var paths = {
  index: './client/index.html',
  root: './client',
  html: './client/**.html',
  scripts: './client/app/**/*.js',
  styles: './client/app/**/*.css'
};

var hashOptions = {
  algorithm: 'md5',
  hashLength: 10,
  template: '<%= name %>.<%= hash %><%= ext %>'
};
var manifestPath = 'asset-hashes.json';

gulp.task('default', $.sequence('inject','hash', 'server', 'watch'));
gulp.task('server', startServer);
gulp.task('watch', startWatch);
gulp.task('inject', startInject);
gulp.task('hash', hashing);

gulp.task('replaceManifests', replaceManifests);
gulp.task('scripts', scripts);
gulp.task('styles', styles);

function startServer(){
  require('./server');

}
function startWatch(){
  //fixme
  gulp.watch('./client/app/**/*.css', hashing, $.livereload.changed);
  gulp.watch('./client/app/**/*.js', hashing,  $.livereload.changed);
  gulp.watch('./client/**/*.html', hashing, $.livereload.changed);

}

function startInject(){
  var target  = gulp.src( paths.index );
  var scripts = gulp.src( paths.scripts, {read:false} );
  var styles  = gulp.src( paths.styles, {read:false} );

  return target
    .pipe( $.inject( scripts,  {relative:true}) )
    .pipe( $.inject( styles,  {relative:true}) )
    .pipe( gulp.dest( paths.root ) );
}

function hashing(cb) {
  runSeq('scripts', 'styles', 'replaceManifests', cb);

}



// Adds the files in `srcStream` to the manifest file, extending the manifest's current contents.
function addToManifest(srcStream) {
  return es.concat(
    gulp.src(manifestPath),
    srcStream
      .pipe(hash.manifest(manifestPath))
  )
  .pipe(extend(manifestPath, false, 4))
  .pipe(gulp.dest('.'));
}

function scripts () {
  console.log("scripts")
  return addToManifest(
    gulp.src('client/**/*.js')
      .pipe(hash(hashOptions))
      .pipe(gulp.dest('public/'))
  );
}

function styles () {
  console.log("styles")
  return addToManifest(
    gulp.src('client/**/*.css')
      .pipe(hash(hashOptions))
      .pipe(gulp.dest('public/'))
  );
}
function replaceManifests () {
  gulp.src('asset-hashes.json')
  .pipe(references(gulp.src('client/**/index.html')))
  .pipe(gulp.dest('public/'));
}

})();
