const gulp = require("gulp");
const sass = require("gulp-sass");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const webpack2 = require("webpack");
const webpack = require('webpack-stream');

gulp.task("default", ["build-css", "build-js"]);

gulp.task("build-css", function() {
    return gulp.src(["sass/*.scss"])
        .pipe(sass({
            outputStyle: "compressed"
        }))
        .pipe(rename("toast-controller.min.css"))
        .pipe(gulp.dest("dist/css/"));
});

gulp.task("build-js", function() {
    return gulp.src(["src/*.js"])
        .pipe(webpack(require("./webpack.config.js"), webpack2))
        .pipe(gulp.dest("dist/js/"));
});

gulp.task("watch", function() {
    gulp.watch(["sass/*.scss"], ["build-css"]);
    gulp.watch(["src/*.js"], ["build-js"]);
});
