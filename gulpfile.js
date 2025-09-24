const gulp = require("gulp");
const concat = require("gulp-concat");
const sass = require("gulp-sass")(require("sass"));
const cssnano = require("gulp-cssnano");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const browserSync = require("browser-sync").create();

const paths = {
  html: ["app/index.html", "app/html/**/*.html"],
  scss: "app/scss/**/*.scss",
  js: "app/js/**/*.js",
  images: "app/img/**/*"
};

function html() {
  return gulp.src(paths.html)
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
}

function scss() {
  return gulp.src(paths.scss)
    .pipe(sass().on("error", sass.logError))
    .pipe(cssnano())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
}

function js() {
  return gulp.src(paths.js)
    .pipe(concat("script.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"))
    .pipe(browserSync.stream());
}

function images() {
  return gulp.src(paths.images)
    .pipe(imagemin())
    .pipe(gulp.dest("dist/imgs"))
    .pipe(browserSync.stream());
}

function serve() { 
  browserSync.init({
    server: {
      baseDir: "dist",
      index: "index.html"
    }
  });

  gulp.watch(paths.html, html);
  gulp.watch(paths.scss, scss);
  gulp.watch(paths.js, js);
  gulp.watch(paths.images, images);
}

exports.html = html;
exports.scss = scss;
exports.js = js;
exports.images = images;
exports.serve = serve;

// Default-завдання
gulp.task("default", gulp.series(
  gulp.parallel(html, scss, js, images),
  serve
));
