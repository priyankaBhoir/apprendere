var gulp = require("gulp");
var babel = require("gulp-babel");

gulp.task("default", ['tranform', 'server']);
gulp.task('server', startServer);
gulp.task('tranform', tranform);

function startServer(){
  require('./server');

}
function tranform() {
  return gulp.src("public/js/*.js")
    .pipe(babel())
    .pipe(gulp.dest("public/"));
}