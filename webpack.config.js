'use strict';

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const tsLintPlugin = require('tslint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = env => {
  // all options for all loaders
  const fileLoaderOptions = {
    name: './fonts/[hash].[ext]',
  };

  const urlLoaderOptions = {
    limit: 10000,
    name: './images/[hash].[ext]',
  };

  const postcssLoaderOptions = {
    plugins: () => [autoprefixer],
  };

  return {
    name: 'Client',
    target: 'web',
    context: path.resolve(__dirname, 'src'),
    entry: {
      app: ['./app.tsx'],
      //style: './styles/main.less'
    },
    devtool: env === 'release' ? 'false' : 'source-map',
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      mainFields: ['browser', 'main'],
      alias: {
        components: path.resolve(__dirname, 'src/components'),
        views: path.resolve(__dirname, 'src/views/'),
        styles: path.resolve(__dirname, 'src/styles/'),
        models: path.resolve(__dirname, 'src/models/'),
        utils: path.resolve(__dirname, 'src/utils/'),
      },
    },
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].js',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: [/(node_modules)/],
          use: [
            {
              loader: 'babel-loader',
            },
            {
              loader: 'ts-loader',
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
              //options: cssLoaderOptions
            },
            {
              loader: 'postcss-loader',
              options: postcssLoaderOptions,
            },
          ],
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
              //options: cssLoaderOptions
            },
            {
              loader: 'postcss-loader',
              options: postcssLoaderOptions,
            },
            {
              loader: 'less-loader',
            },
          ],
        },
        {
          test: /\.(png|gif|jpg|svg)$/,
          use: [
            {
              loader: 'url-loader',
              options: urlLoaderOptions,
            },
          ],
        },
        {
          test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: fileLoaderOptions,
            },
          ],
        },
      ], // rules
    },
    // typescript linter
    plugins: [
      new tsLintPlugin({
        files: ['./src/**/*.ts{,x}'],
        typeCheck: true,
        project: 'tsConfig.json',
      }),
      new CopyWebpackPlugin([{ from: './assets' }]),
      new ExtractTextPlugin('[name].css'),
    ],
  };
};

/*
	// use those rules for release
	// TODO: Why, Kay, Why??? I do not know anymore. Sincerely yours, Kay (from the future)

	{
		test: /\.css$/,
		loader: ExtractTextPlugin.extract({
			fallback: 'style-loader',
			use: [{
				loader: 'css-loader'
			}, {
				loader: 'postcss-loader',
				options: postcssLoaderOptions
			}]
		})
	}, {
		test: /\.less$/,
		loader: ExtractTextPlugin.extract({
			fallback: 'style-loader',
			use: [{
				loader: 'css-loader'
			}, {
				loader: 'postcss-loader',
				options: postcssLoaderOptions
			}, {
				loader: 'less-loader'
			}]
		})
	}
*/
