// Build projeto
module.exports = function (gulp, plugins, config, babel) {
  gulp.task("babel", function () {
    return gulp.src(config.jsBabelSrc)
        .pipe(babel())
        .pipe(gulp.dest(config.jsBabelDist));
  });
};
