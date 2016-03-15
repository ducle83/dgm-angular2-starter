'use strict'

var gulp = require('gulp')
var gutil = require("gulp-util")
var env = require("gulp-env")
var webpack = require('webpack')
var path = require('path')
var sync = require('run-sequence')
var del = require('del')
var WebpackDevServer = require('webpack-dev-server')

var root = "src"
var PORT = 5000

var resolveToApp = function(glob) {
	glob = glob || ""
	return path.join(root, "app", glob)
}

var resolveToSrc = function(glob) {
	glob = glob || ""
	return path.join(root, glob)
}

var paths = {
	ts: resolveToSrc("**/*.ts"),
	scss: resolveToSrc("**/*.scss"),
	jade: resolveToSrc("**/*.jade"),
	html: resolveToSrc("**/*.html"),
}

gulp.task('webpack', function(callback) {
  webpack(require('./webpack.config'), function(err, stats){
    if(err) throw new gutil.PluginError("webpack", err);
      gutil.log("[webpack]", stats.toString({}));
      callback();
  })
})

gulp.task("serve", function(callback) {
  new WebpackDevServer(webpack(require('./webpack.config')), {
    publicPath: '/build',
    contentBase: 'src/public',
    historyApiFallback: true,
    stats: { 
      colors: true,
      reasons: false,
      timings: false,
      hash: false,
      version: false,
      chunks: false,
      chunkModules: false,
      cached: false,
      cachedAssets: false,
    }
  }).listen(PORT, "localhost", function(err) {
      if(err) throw new gutil.PluginError("webpack-dev-server", err);
      gutil.log("[webpack-dev-server]", "http://localhost:5000/webpack-dev-server/index.html");
      callback();
  });
});

gulp.task('watch', function() {
  var allPaths = [].concat([paths.ts], paths.jade, paths.html, [paths.scss]);
  gulp.watch(allPaths, ['webpack']);
})

gulp.task('dist', function() {
  gulp.src('./build/**/*').pipe(gulp.dest('./dist/build'))
  gulp.src('./src/public/**/*').pipe(gulp.dest('./dist'))
})

gulp.task('clean', function() {
  del([
    './build',
    './dist'
  ])
})

gulp.task('dev', function(callback) {
  sync('serve', callback)
})

gulp.task('build', function(callback) {
  sync('clean', 'env-production', 'webpack', 'dist', callback)
})

gulp.task('env-production', function(callback) {
  env({
    vars: {
     NODE_ENV: 'production'
    }
  })
  callback()
})