///
/// Dependencies
///

const gulp          = require( 'gulp' );
const browserSync   = require( 'browser-sync' );
const webpack       = require( 'webpack-stream' );
const uglify        = require( 'gulp-uglify' );
const sass          = require( 'gulp-sass' );
const postcss       = require( 'gulp-postcss' );
const autoprefixer  = require( 'autoprefixer' );
const cssnano       = require( 'cssnano' );


///
/// Local variables
///

const path = {
  SCSS_SRC_ALL: 'src/scss/**/*.scss',
  SCSS_SRC_MAIN: 'src/scss/main.scss',
  CSS_DEST: './',
  JS_SRC_ALL: 'src/**/*.js',
  JS_SRC_MAIN: 'src/App.js',
  JS_DEST: './'
};


///
/// Development server
///

gulp.task( 'server', function() {
  browserSync.init({
    server: './',
    ghostMode: false
  });
});


///
/// Watch files
///

gulp.task( 'watch', function() {
  gulp.watch( path.SCSS_SRC_ALL, [ 'styles' ]);
  gulp.watch( path.JS_SRC_ALL, [ 'scripts' ]);
});


///
/// JS bundler
///

gulp.task( 'scripts', function() {
  gulp.src( path.JS_SRC_MAIN )
    .pipe( webpack({
      output: {
        filename: 'app.js'
      },
      module: {
        loaders: [{
          test: /\.jsx?$/,
          exclude: '/node_modules/',
          loader: 'babel-loader',
          query: {
            presets: [ 'es2015', 'react' ]
          }
        }]
      }
    }))
    .pipe( gulp.dest( path.JS_DEST ))
    .pipe( browserSync.stream() );
});


///
/// SCSS compilation
///

gulp.task( 'styles', function () {
  gulp.src( path.SCSS_SRC_MAIN )
    .pipe( sass({
        includePaths: [ 'node_modules' ],
        outputStyle: 'expanded'  // expanded for development
      })
      .on( 'error', sass.logError ))
    .pipe( postcss([
      autoprefixer({
        browsers: [ 'last 2 versions' ]
      })
    ]))
    .pipe( gulp.dest( path.CSS_DEST ))
    .pipe( browserSync.stream() );
});


///
/// Conglomerate tasks
///

gulp.task( 'default', [ 'styles', 'scripts' ]);
gulp.task( 'serve', [ 'default', 'server', 'watch' ]);


