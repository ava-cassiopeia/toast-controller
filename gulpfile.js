var gulp = require("gulp");
var sass = require("gulp-sass");
var rename = require("gulp-rename");

gulp.task("default", ["build-css"], function() {});

gulp.task("build-css", function() {
    return gulp.src(["sass/*.scss"])
        .pipe(sass({
            outputStyle: "compressed"
        }))
        .pipe(rename("toast-controller.min.css"))
        .pipe(gulp.dest("dist/css/"));
});

gulp.task("watch", function() {
    gulp.watch(["sass/*.scss"], ["build-css"]);
});
