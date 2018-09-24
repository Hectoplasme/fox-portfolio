const gulp = require("gulp");
const watch = require("gulp-watch");
const browserSync = require("browser-sync");
const config = require("../config");

gulp.task("watch", ["browser-sync"], function() {
  gulp.watch(`${config.paths.src}${config.paths.js}main/**/**/*`, [
    "browserify",
    browserSync.reload
  ]);
  gulp.watch(`${config.paths.src}${config.paths.js}modules/**/**/*`, [
    "browserify-modules",
    browserSync.reload
  ]);
  gulp.watch(`${config.paths.src}${config.paths.css}**/**/**/*`, [
    "sass",
    browserSync.reload
  ]);
  gulp.watch(`${config.paths.src}${config.paths.css}ui.scss`, [
    "sass-ui",
    browserSync.reload
  ]);
  gulp.watch(`${config.paths.src}${config.paths.templates}**/*`, [
    "templates",
    browserSync.reload
  ]);
});
