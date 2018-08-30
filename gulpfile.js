var syntax        = 'sass'; // Syntax: sass or scss;

var gulp          = require('gulp'),
		gutil         = require('gulp-util' ),
		sass          = require('gulp-sass'),
		browserSync   = require('browser-sync'),
		concat        = require('gulp-concat'),
		uglify        = require('gulp-uglify'),
		cleancss      = require('gulp-clean-css'),
		rename        = require('gulp-rename'),
		autoprefixer  = require('gulp-autoprefixer'),
		notify        = require("gulp-notify"),
		watermark 		= require('gulp-watermark'),
		rsync         = require('gulp-rsync');

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		// open: false,
		// online: false, // Work Offline Without Internet Connection
		// tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
	})
});

gulp.task('styles', function() {
	return gulp.src('app/'+syntax+'/**/*.'+syntax+'')
	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
});

gulp.src("img/portfolio-images/*.jpg")
.pipe(watermark({
    image: "img/logo.png",
    resize: '100x100',
    gravity: 'Center'
}))
.pipe(gulp.dest("app/img"));

gulp.task('js', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery-2.1.3.min.js',
		'app/libs/bootstrap/bootstrap.min.js',
		'app/libs/owl-carousel/owl.carousel.min.js',
		'app/libs/mixitup/mixitup.min.js',
		'app/libs/jqBootstrapValidation/jqBootstrapValidation.js',
		'app/libs/magnific/jquery.magnific-popup.min.js',
		'app/libs/scroll2id/PageScroll2id.min.js',
		'app/libs/waypoints/waypoints.min.js',
		'app/libs/lazyload/lazyload.min.js',
		'app/libs/animate/animate-css.js',
		'app/libs/phone/jquery.inputmask.bundle.js',
		'app/libs/phone/phone.js',
		'app/libs/prognroll/prognroll.js',
		'app/libs/parallax/parallax.js',
		'app/libs/typeit/typeit.min.js',
		'app/libs/animateNumber/jquery.animateNumber.min.js',
		'app/js/common.js',
		])
	.pipe(concat('scripts.min.js'))
	// .pipe(uglify()) // Mifify js (opt.)
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('rsync', function() {
	return gulp.src('app/**')
	.pipe(rsync({
		root: 'app/',
		hostname: 'f02079ed@timdjol.com',
		destination: 'timdjol.com/public_html/',
		include: ['*.htaccess'], // Includes files to deploy
		exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
		recursive: true,
		archive: true,
		silent: false,
		compress: true
	}))
});

gulp.task('watch', ['styles', 'js', 'browser-sync'], function() {
	gulp.watch('app/'+syntax+'/**/*.'+syntax+'', ['styles']);
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
	gulp.watch('app/*.html', browserSync.reload)
});

gulp.task('default', ['watch']);
