// Підключення Gulp та плагінів
const gulp = require("gulp"); 
const concat = require("gulp-concat"); 
const sass = require("gulp-sass")(require("sass")); 
const cssnano = require("gulp-cssnano"); 
const rename = require("gulp-rename"); 
const uglify = require("gulp-uglify"); 
const imagemin = require("gulp-imagemin"); 
const browserSync = require("browser-sync").create(); 
const fileinclude = require("gulp-file-include"); 

// Шляхи
const paths = {
  html: ["app/*.html"],        // головні файли
  scss: "app/scss/**/*.scss",  // стилі
  js: "app/js/**/*.js",        // скрипти
  images: "app/img/**/*"       // картинки
};

// HTML task
function html() {
  return gulp.src(paths.html)
    .pipe(fileinclude({
      prefix: "@@",
      basepath: "@file"
    }))
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
}

// SCSS task
function scss() {
  return gulp.src(paths.scss)
    .pipe(sass().on("error", sass.logError))
    .pipe(cssnano())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
}

// JS task
function js() {
  return gulp.src(paths.js)
    .pipe(concat("script.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"))
    .pipe(browserSync.stream());
}

// Images task
function images() {
  return gulp.src(paths.images, { 
      encoding: false  
    })
    .pipe(imagemin()) // Додано imagemin для оптимізації
    .pipe(gulp.dest("dist/img"))
    .pipe(browserSync.stream());
}

// Bootstrap tasks
function bootstrapCSS() {
  return gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
    .pipe(gulp.dest('dist/css'));
}

function bootstrapJS() {
  return gulp.src('node_modules/bootstrap/dist/js/bootstrap.bundle.min.js')
    .pipe(gulp.dest('dist/js'));
}

// Server + watch
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
gulp.task('scss', function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      quietDeps: true // Ігнорує попередження про застарілі функції
    }).on('error', sabs.logError))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});
// Експорти
exports.html = html;
exports.scss = scss;
exports.js = js;
exports.images = images;
exports.bootstrapCSS = bootstrapCSS;
exports.bootstrapJS = bootstrapJS;
exports.serve = serve;

// Default task
exports.default = gulp.series(
  gulp.parallel(html, scss, js, images, bootstrapCSS, bootstrapJS),
  serve
);
