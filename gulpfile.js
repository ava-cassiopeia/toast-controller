const gulp = require('gulp-param')(require('gulp'), process.argv);
const sass = require("gulp-sass");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const webpack2 = require("webpack");
const webpack = require('webpack-stream');
const gulpif = require("gulp-if");

const SASS_RESOURCES = [
    "sass/*.scss"
];

const JS_RESOURCES = [
    "src/*.js"
];

const SASS_CONFIG = {
    outputStyle: "compressed"
};

gulp.task("default", ["build-css", "build-js"]);

gulp.task("build-css", function() {
    return gulp.src(SASS_RESOURCES)
        .pipe(sass(SASS_CONFIG))
        .pipe(rename("toast-controller.min.css"))
        .pipe(gulp.dest("dist/css/"));
});

gulp.task("build-js", function(production) {
    return gulp.src(JS_RESOURCES)
        .pipe(webpack(require("./webpack.config.js"), webpack2))
        .pipe(gulpif(production, uglify()))
        .pipe(gulp.dest("dist/js/"));
});

gulp.task("watch", function() {
    gulp.watch([SASS_RESOURCES], ["build-css"]);
    gulp.watch([JS_RESOURCES], ["build-js"]);
});
