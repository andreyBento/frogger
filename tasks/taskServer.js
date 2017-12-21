// Inicia server
module.exports = function (gulp, plugins, config, babel) {
  gulp.task('server', ['sass', 'babel'],function(){
      plugins.browserSync.init({
          server: {
              baseDir: config.srcPath
          }
      });
      gulp.watch(config.jsBabelSrc, ['babel']);
      gulp.watch(config.sassSrc, ['sass']);
      gulp.watch([config.srcWatch, config.cssSrcPath]).on('change', plugins.browserSync.reload);
  });
};
