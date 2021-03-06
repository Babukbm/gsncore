var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var exec = require('child_process').exec;

var pkg = require('./package.json');
var banner = [
  '/*!',
  ' * <%= pkg.name %>',
  ' * version <%= pkg.version %>',
  ' * <%= pkg.description %>',
  ' * Build date: <%= new Date() %>',
  ' */\n'
].join('\n');
var allSources = ['src/gsn.js', 'src/module.js', 'src/gsn-ui-map.js', 'src/angular-recaptcha.js', 'vendor/**.js', 'src/services/*.js', 'src/filters/*.js',
  'src/directives/!(ctrlCouponRoundy|ctrlRoundyProfile).js'];

gulp.task('build', function() {
  return gulp.src(allSources)
    .pipe($.concat('gsncore.js'))
    .pipe($.header(banner, {
      pkg: pkg
    }))
    .pipe(gulp.dest('.'));
});

gulp.task('bump', function() {
  gulp.src(['package.json', 'bower.json'])
    .pipe($.bump({
      type: 'patch'
    }))
    .pipe(gulp.dest('.'));
});

gulp.task('bump:minor', function() {
  gulp.src(['package.json', 'bower.json'])
    .pipe($.bump({
      type: 'minor'
    }))
    .pipe(gulp.dest('.'));
});

gulp.task('bump:major', function() {
  gulp.src(['package.json', 'bower.json'])
    .pipe($.bump({
      type: 'major'
    }))
    .pipe(gulp.dest('.'));
});

gulp.task('build-basic', function() {
  return gulp.src(['src/gsn.js', 'src/module.js', 'src/gsn-ui-map.js', 'src/bindonce.js', 'src/angular-recaptcha.js', 'src/filters/*.js', 'src/services/!(gsnProLogicRewardCard).js'
    , 'src/directives/ctrlAccount.js'
    , 'src/directives/ctrlChangePassword.js'
    , 'src/directives/ctrlCircular.js'
    , 'src/directives/ctrlContactUs.js'
    , 'src/directives/ctrlEmail.js'
    , 'src/directives/ctrlEmailPreview.js'
    , 'src/directives/ctrlLogin.js'
    , 'src/directives/ctrlShoppingList.js'
    , 'src/directives/facebook.js'
    , 'src/directives/gsn*.js'
    , 'src/directives/ngGiveHead.js'
    , 'src/directives/placeholder.js'
    , 'vendor/angular-facebook.js'
    , 'vendor/angulartics.min.js'
    , 'vendor/fastclick.js'
    , 'vendor/loading-bar.min.js'
    , 'vendor/ng-infinite-scroll.min.js'
    , 'vendor/ui-utils.min.js'
  ])
    .pipe($.concat('gsncore-basic.js'))
    .pipe($.header(banner, {
      pkg: pkg
    }))
    .pipe(gulp.dest('.'));
});


gulp.task('default', ['build', 'build-basic'], function() {
  gulp.src('./gsncore-basic.js')
    .pipe($.uglify())
    .pipe($.header(banner, {
      pkg: pkg
    }))
    .pipe($.rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('.'));

  return gulp.src('./gsncore.js')
    .pipe($.uglify())
    .pipe($.header(banner, {
      pkg: pkg
    }))
    .pipe($.rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('.'));
});