const gulp = require("gulp");
const notify = require("gulp-notify");
const sass = require("gulp-sass");
const sassGlob = require("gulp-sass-glob");
const sourcemaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const wait = require("gulp-wait");
const autoprefixer = require("autoprefixer");
const config = require("../config");

gulp.task("sass", ["sass-ui"], () =>
  gulp
    .src(`./${config.paths.src}${config.paths.css}/*.scss`)
    .pipe(wait(500))
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass())
    .on(
      "error",
      notify.onError(function(error) {
        return "sass: " + error.message;
      })
    )
    .pipe(postcss([autoprefixer({ browsers: ["last 2 versions"] })]))
    .pipe(sourcemaps.write(config.paths.maps))
    .pipe(
      gulp.dest(`${config.paths.dist}${config.paths.assets}${config.paths.css}`)
    )
);

gulp.task("sass-ui", () =>
  gulp
    .src(`./${config.paths.src}${config.paths.css}/ui.scss`)
    .pipe(wait(500))
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass())
    .on(
      "error",
      notify.onError(function(error) {
        return "sass: " + error.message;
      })
    )
    .pipe(postcss([autoprefixer({ browsers: ["last 2 versions"] })]))
    .pipe(sourcemaps.write(config.paths.maps))
    .pipe(
      gulp.dest(`${config.paths.dist}${config.paths.assets}${config.paths.css}`)
    )
);
