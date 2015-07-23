var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var livereload = require('gulp-livereload');
var nodemon = require("gulp-nodemon");
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var glob = require('glob');
var autoprefixer = require('gulp-autoprefixer');
var watchify = require('watchify');
var babelify = require("babelify");

var plumberOption = {
    errorHandler:function(e){
        console.log(e);
    }
}



gulp.task('js', function(){
    // solo controlla que min esté en la cadena porque el postscript de heroku
    // hace build y despues min otra vez porque a veces 
    // no se terminan de generar bien los min
    var isBuild = this.seq.indexOf('min')>0;

    glob('./apps/**/*public.js', function(err, files) {
        files.forEach(function(entry) {
                var w = isBuild ? browserify({ entries: [entry] }) : watchify(browserify({ entries: [entry] }))
                var build = function(){
                    w
                    .transform(babelify)
                    .bundle()
                    .pipe(source(entry))
                    .pipe(gulp.dest('./public/dist/'))
                    .pipe(livereload());
                }
                w.on('update',build)
                build();
        });
    });
});

gulp.task('watch-js',['js']);

gulp.task('less', function() {
    return gulp.src('./apps/**/*public.less')
        .pipe(plumber(plumberOption))
        .pipe(less())
        .pipe(autoprefixer("last 1 version", "> 1%", "ie 8", "ie 7"))
        .pipe(gulp.dest('./public/dist/apps/'));
});

gulp.task('watch-less', ['less'], function() {
    return gulp.watch(['./apps/**/*.less','./less/**/*.less'], ['less']);
})


gulp.task('min-js',['js'], function(){
    return gulp.src(['./public/dist/**/*.js','!**/*.min.js'])
      .pipe(plumber(plumberOption))
      .pipe(uglify({
          mangle: false
      }))
      .pipe(rename(function (path) {
          path.basename += ".min";
      }))
      .pipe(gulp.dest('./public/dist/'));
})


gulp.task('min-css', ['less'], function(){
    return gulp.src(['./public/dist/**/*.css','!**/*.min.css'])
      .pipe(minifyCSS({
        processImport:false
      }))
      .pipe(rename(function (path) {
          path.basename += ".min";
      }))
      .pipe(gulp.dest('./public/dist/'));
})

// en of js

gulp.task('livereload', function(){
    livereload.listen()
});

gulp.task('server', function (devAPI) {
  nodemon({
    script: 'index',
    args: ['--dev'],
    exec: './node_modules/.bin/babel-node',
    ignore:['public/**','**/*public.js','helpers/**']
  })
});

gulp.task('watch-templates', function() {
    return gulp.watch(['./apps/**/*template.html'], livereload.changed);
})

function notifyLivereload(event) {
    var fileName = require('path').relative('/'+__dirname + '/public', event.path);
    livereload.changed(fileName);
}

gulp.task('watch-statics', function() {
    return gulp.watch(['./public/**/*.css'], notifyLivereload);
})

gulp.task('watch',['watch-js','watch-less','watch-templates','watch-statics'])

gulp.task('min' , ['min-js','min-css'])
gulp.task('build' ,['min'])

gulp.task('default',['watch','livereload','server']);