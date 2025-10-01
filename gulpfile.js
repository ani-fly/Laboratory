const gulp = require("gulp"); // Підключення Gulp
const concat = require("gulp-concat"); // Підключення плагіна для конкатенації файлів
const sass = require("gulp-sass")(require("sass")); // Підключення плагіна для компіляції SCSS
const cssnano = require("gulp-cssnano"); // Підключення плагіна для мінімізації CSS
const rename = require("gulp-rename"); // Підключення плагіна для перейменування файлів
const uglify = require("gulp-uglify"); // Підключення плагіна для мінімізації JS
const imagemin = require("gulp-imagemin"); // Підключення плагіна для оптимізації зображень
const browserSync = require("browser-sync").create(); // Підключення BrowserSync

const paths = {
  html: ["app/index.html", "app/html/**/*.html"],
  scss: "app/scss/**/*.scss",
  js: "app/js/**/*.js",
  images: "app/img/**/*"
};
// Завдання для обробки HTML

export const html_task = () => src('app/index.html')
    .pipe(fileInclude({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe(dest('dist'));

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

  gulp.watch(paths.html, html); // Слідкування за змінами в HTML
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
  gulp.parallel(html, scss, js, images), // Виконання всіх завдань паралельно
  serve
));
