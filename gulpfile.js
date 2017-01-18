var gulp = require("gulp");
var sass = require("gulp-sass");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");

gulp.task("default", ["build-css", "build-js"], function() {});

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
        .pipe(uglify())
        .pipe(rename("ToastController.min.js"))
        .pipe(gulp.dest("dist/js/"));
});

gulp.task("watch", function() {
    gulp.watch(["sass/*.scss"], ["build-css"]);
    gulp.watch(["src/*.js"], ["build-js"]);
});
