var gulp =       require('gulp');
var gutil =      require('gulp-util');
var uglify =     require('gulp-uglify');
var jshint =     require('gulp-jshint');;
var rename =     require('gulp-rename');
var concat =     require('gulp-concat');
var header =     require('gulp-header');
var git =        require('gulp-git');
var runSeq =     require('run-sequence');
var inject =     require('gulp-inject');

var del =        require('del');
var fs =         require('fs');
var bump =       require('gulp-bump');
var exec =       require('child_process').exec;

var pkg = require('./package.json');
var banner = [
  '/*!',
  ' * <%= pkg.name %>',
  ' * version <%= pkg.version %>',
  ' * <%= pkg.description %>',
  ' * Build date: <%= new Date() %>',
  ' */\n'
].join('\n');
var allSources = ['src/gsn.js', 'src/angulartics.gsn.ga.js', 'src/module.js', 'src/angular-recaptcha.js', 'vendor/**.js', 'src/**/*.js'];

gulp.task('bump', function(){
    return gulp.src(['./package.json'])
        .pipe(bump({type: 'patch'}))
        .pipe(gulp.dest('./'));
});

gulp.task('build', function() {
  return gulp.src(allSources)
    .pipe(concat('gsncore.js'))
    .pipe(header(banner, {pkg: pkg}))
    .pipe(gulp.dest('.'));
});

gulp.task('default', ['build'], function() {
  return gulp.src('./gsncore.js')
    .pipe(uglify())
    .pipe(header(banner, {pkg: pkg}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('.'));
});