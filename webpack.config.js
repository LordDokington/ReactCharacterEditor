"use strict";

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const tsLintPlugin = require('tslint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env) => {

	// all options for all loaders
	const fileLoaderOptions = {
		name: './fonts/[hash].[ext]'
	};

	const urlLoaderOptions = {
		limit: 10000,
		name: './images/[hash].[ext]'
	};

	const cssLoaderOptions = {
		modules: true,
		localIdentName: env == 'release' ? '[hash]' : '[name]_[local]_[hash:base64:5]'
	};

	const postcssLoaderOptions = {
		plugins: () => [autoprefixer]
	};


	return {
		name: 'Client',
		target: 'web',
		context: path.resolve(__dirname, 'src'),
		entry: {
			app: [
				'./app.tsx'
			],
			vendor: [
				'babel-polyfill',
				'jquery'
			]
		},
		devtool: env === 'release' ? 'false' : 'source-map',
		resolve: {
			extensions: ['.ts', '.tsx', '.js', '.jsx'],
			mainFields: ['module', 'jsnext:main', 'browser', 'main'],
		},
		output: {
			path: path.resolve(__dirname, 'build'),
			filename: '[name].js'
		},
		module: {
			rules: [{
				test: /\.tsx?$/,
				exclude: [/(node_modules)/],
				use: [{
					loader: 'babel-loader'
				}, {
					loader: 'ts-loader'
				}
				]
			}, {
				test: /\.css$/,
				use: [{
					loader: 'style-loader'
				}, {
					loader: 'css-loader',
					options: cssLoaderOptions
				}, {
					loader: 'postcss-loader',
					options: postcssLoaderOptions
				}]
			}, {
				test: /\.(png|gif|jpg|svg)$/,
				use: [{
					loader: 'url-loader',
					options: urlLoaderOptions
				}]
			}, {
				test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
				use: [{
					loader: 'file-loader',
					options: fileLoaderOptions
				}]
			}

			] // rules
		},
		// typescript linter
		plugins: [
			new tsLintPlugin({
				files: ['./src/**/*.ts{,x}']
			}),
			new CopyWebpackPlugin([
				{ from: './assets' },
				{ from: './assets/Skeleton' }
			])
		]
	}
}