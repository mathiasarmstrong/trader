import _ from 'lodash';
import path from 'path';
import webpack from 'webpack';
import HappyPack from 'happypack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import {envVariables, sandboxUrl, prodUrl} from './conf.js';
import StatsWebpackPlugin from 'stats-webpack-plugin';
import queryString from 'querystring';
/**
 * Env Constants
 */
const isProd = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';
const isDevelopment = process.env.NODE_ENV === 'development';
const startServer = process.env.START_SERVER === 'true' || process.env.START_SERVER === 'open';
const ENVConfig = isProd && (startServer || process.env.MOCKS) ? 'development' : process.env.NODE_ENV;
const TESTPATH = `./lib/${process.env.TESTPATH || '**/*'}.spec.js`;
const preventAngularEnv = !!process.env.PREVENT_ANGUlAR_ENV;
const loadFullFunnel = isProd || !!process.env.FFPATH;

if (isTest) {
  /*eslint-disable no-console*/
  console.log('*****************************************************');
  console.log('| Test ENV detected: Not loading SCSS PUG or ASSETS');
  console.log(`| Angular testing ENV ${preventAngularEnv ? 'not' : ''} mounted`);
  console.log(`| Testing ${TESTPATH}`);
  console.log('*****************************************************');
  /*eslint-enable no-console*/
}


// eslint-disable-next-line angular/json-functions
process.env.CONFIG = JSON.stringify(envVariables[ENVConfig].ENV);
const entry = {
  main: path.resolve('src/lib/main.module.js'),
  // order of these injections matter, dependencies must be loaded first
  vendor: [
    'lodash',
    'mithril'
  ]
};

/**
* Plugin Configs
*/
const devServerOptions = {
  port: 3000,
  inline: !isProd,
  compress: true,
  quiet: false,
  contentBase: isProd ? 'dist/assets' : '.tmp/assets',
  historyApiFallback: true,
  host: 'localhost',
  open: process.env.START_SERVER === 'open'
};


const globals = {
  m: 'mithril',
  _: 'lodash'
};

const envWhiteList = {'CONFIG': false, 'NODE_ENV': false};
const indexHtmlConfig = {
  title: 'Amp 3.0',
  template: 'src/lib/index.pug',
  filename: 'index.html',
  inject: 'head'
};

/**
 * Specific Loaders for Dependency
 */
const dependencyLoaders = [];

// Rules
const jsLoaders = [{
  test: /\.js$/,
  exclude: /node_modules/,
  use: [
    isProd ? {
      loader: 'babel-loader', options: {
        plugins: [
          'transform-es2015-template-literals',
          'transform-es2015-literals',
          'transform-es2015-function-name',
          'transform-es2015-arrow-functions',
          'transform-es2015-block-scoped-functions',
          'transform-es2015-classes',
          'transform-es2015-object-super',
          'transform-es2015-shorthand-properties',
          'transform-es2015-computed-properties',
          'transform-es2015-for-of',
          'transform-es2015-sticky-regex',
          'transform-es2015-unicode-regex',
          'check-es2015-constants',
          'transform-es2015-spread',
          'transform-es2015-parameters',
          'transform-es2015-destructuring',
          'transform-es2015-block-scoping',
          'transform-es2015-typeof-symbol',
          ['transform-regenerator', {'async': false, 'asyncGenerators': false}]
        ]
      }
    } : 'happypack/loader',
    'import-glob'
  ]
}];

const testLoaders = [
  {
    enforce: 'pre',
    test: /\.js$/,
    // eslint-disable-next-line max-len
    exclude: /\/node_modules\/|\/\.tmp\/|\/sandbox\/|\/cloned-modules\/|\/testing\/|\.run\.js$|\.config\.js$|\.spec\.js$|\.constant\.js$|\.messages\.js$|\-decorator\.js$|\.module\.js$/,
    use: [
      {
        loader: 'istanbul-instrumenter-loader',
        options: {esModules: true}
      },
      'import-glob'
    ]
  },
  {
    test: /\.js$/,
    exclude: /node_modules/,
    // eslint-disable-next-line angular/json-functions
    loader: `ifdef-loader?${queryString.encode({json: JSON.stringify({isTest, preventAngularEnv, loadFullFunnel})})}`,
    enforce: 'pre'
  },
  {
    test: /tests\.js$/,
    loader: 'string-replace-loader',
    options: {
      search: 'TESTPATH',
      replace: TESTPATH
    },
    enforce: 'pre'
  }
];

isTest && jsLoaders.push(...testLoaders);

const scssLoaderList = [
  {
    loader: 'style-loader',
    options: {
      sourceMap: true
    }
  },
  {
    loader: 'css-loader',
    options: {
      sourceMap: true
    }
  },
  {
    loader: 'resolve-url-loader',
    options: {
      sourceMap: true
    }
  },
  {
    loader: 'sass-loader',
    options: {
      sourceMap: true,
      includePaths: [
        path.resolve('./node_modules'),
        path.resolve('./src/lib'),
        path.resolve('./src/lib/common/styles')
      ]
    }
  },
  'import-glob'
];

const stringScssLoader = `css-loader?sourceMap!resolve-url-loader?sourceMap!sass-loader?${
  // eslint-disable-next-line angular/json-functions
  JSON.stringify(scssLoaderList[3].options)
}!import-glob`;

const scssLoader = {
  test: /\.scss$/,
  use: isProd ? ExtractTextPlugin.extract({fallback: 'style-loader', use: stringScssLoader}) : scssLoaderList
};


const pugLoaders = [
  {
    test: /\/src\/lib\/.+\.pug$/,
    loader: `ngtemplate-loader?relativeTo=${path.resolve(__dirname, './src/')}!pug-html-loader`,
    exclude: /\/index\.pug/
  },
  {
    test: /\/cloned-modules\/.+\.pug$/,
    loader: `ngtemplate-loader?module=schemaForm&relativeTo=${
      path.resolve(__dirname, './cloned-modules/sf-material-decorator/')
    }!pug-html-loader`
  },
  {
    test: /\/index\.pug$/,
    loader: 'pug-loader?pretty'
  }
];

const plugins = [
  new webpack.ProvidePlugin(globals),
  new webpack.EnvironmentPlugin(envWhiteList),
  new HtmlWebpackPlugin(indexHtmlConfig),
  isProd ? new ExtractTextPlugin('styles.[hash].css') : new HappyPack({loaders: ['babel-loader?presets[]=es2015']})
];
!isTest && plugins.unshift(
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor.[hash].js'
  })
);

isDevelopment && !startServer && plugins.unshift(
  new StatsWebpackPlugin('stats.json', {
    chunkModules: true
  })
);

const webpackConfig = {
  plugins,
  module: {
    rules: []
    .concat(jsLoaders)
    .concat(pugLoaders)
    .concat(scssLoader)
    .concat(dependencyLoaders)
  },
  stats: {
    colors: true,
    modules: true,
    reasons: true,
    errorDetails: true,
    profile: isDevelopment && startServer
  },

  devtool: isTest ? 'inline-source-map' : 'source-map',
  resolve: {
    extensions: ['.js', '.json', '.css'],
    // Root paths must be absolute.
    // $ref: https://webpack.github.io/docs/configuration.html#resolve-root
    modules: [
      path.resolve('./src'),
      path.resolve('./src/lib'),
      'node_modules'
    ]
  },

  output: {
    path: path.resolve(isProd ? 'dist' : '.tmp'),
    filename: `[name].[${isProd ? 'chunkhash' : 'hash'}].module.js`
  }
};

!isTest && (webpackConfig.entry = entry);
startServer && (webpackConfig.devServer = devServerOptions);

module.exports = webpackConfig;
