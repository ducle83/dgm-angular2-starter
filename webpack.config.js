var path = require('path');
var webpack = require('webpack');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var isDebug = process.env.NODE_ENV !== "production";

var pluginsDebug =  [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new BrowserSyncPlugin(
      {
        host: 'localhost',
        port: 3000,
        proxy: 'http://localhost:5000/'
      },
      {
        reload: false
      }
    )
]

var pluginsProduction = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false },
    comments: false,
    stats: false,
    output: {
      comments: false
    }
  }),
  new webpack.optimize.AggressiveMergingPlugin()
]

var entryDebug = [
  "webpack-dev-server/client?http://0.0.0.0:5000",
  path.join(__dirname, "src/app/main.ts")
]

var entryProduction = [
  path.join(__dirname, "src/app/main.ts") 
]

module.exports = {
  devtool: isDebug ? 'cheap-module-eval-source-map' : false,
  cache: isDebug,
  debug: isDebug, 
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
  },
  plugins: isDebug ? pluginsDebug : pluginsProduction,
  entry: {
    app: isDebug ? entryDebug : entryProduction,
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, "build"),
    sourceMapFilename: '[name].js.map',
    publicPath: '/build/',
    chunkFilename: '[id].chunk.js'
  },

  resolve: {
    extensions: ['','.ts','.js','.json', '.scss', '.jade']
  },

  module: {
    preLoaders: [ { test: /\.ts$/, loader: 'tslint-loader' } ],
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts?' + JSON.stringify( {
          'ignoreDiagnostics': [
            2403, // 2403 -> Subsequent variable declarations
            2300, // 2300 -> Duplicate identifier
            2374, // 2374 -> Duplicate number index signature
            2375  // 2375 -> Duplicate string index signature
          ]
        }),
        exclude: [ /\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/ ]
      },
      { test: /\.json$/,  loader: 'json' },
      { 
        test: /\.scss$/,   
        loader: 'raw-loader!sass?sourceMap',
      },
      { 
        test: /\.css$/,   
        loader: 'raw-loader',
      },
      { 
        test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/, 
        loader: 'url?limit=' + (isDebug ? 9999999 : 5000)
      },
      { 
        test: /\.jade$/,   
        exclude: /node_modules/,
        loader: 'raw-loader!jade-html',
      },
    ]
  },

  // Other module loader config
  tslint: {
    emitErrors: false,
    failOnHint: false
  }
};

// Helper functions

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}

function rootNode(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return root.apply(path, ['node_modules'].concat(args));
}
