const gulp = require("gulp");
const cleanCSS = require("gulp-clean-css");
const config = require("../config");

gulp.task("cssmin", ["sass"], () =>
  gulp
    .src(
      `${config.paths.dist}${config.paths.assets}${config.paths.css}**/*.css`
    )
    .pipe(cleanCSS())
    .pipe(
      gulp.dest(`${config.paths.dist}${config.paths.assets}${config.paths.css}`)
    )
);
