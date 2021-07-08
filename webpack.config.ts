import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Webpack from 'webpack';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { VueLoaderPlugin } from 'vue-loader';
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const WebpackBar = require('webpackbar');

console.log('process.env.NODE_ENV :>> ', process.env.NODE_ENV);

export default {
	entry: ['@babel/polyfill', './src/main.ts'],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
		publicPath: '/',
	},
	stats: 'errors-only',
	target: 'web',
	module: {
		rules: [
			{
				test: /\.css|less|scss|less$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [['postcss-preset-env', {}]],
							},
						},
					},
					{
						loader: 'sass-loader',
					},
					{
						loader: 'less-loader',
					},
				],
			},
			{
				test: /\.ts|js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
					},
				],
			},
			{
				test: /\.vue$/,
				use: [
					{
						loader: 'vue-loader',
					},
				],
			},
			{
				// webpack5 内置了 asset 模块, 用来代替 file-loader & url-loader & raw-loader 处理静态资源
				test: /\.png|jpg|gif|jpeg|svg/,
				type: 'asset',
				parser: {
					dataUrlCondition: {
						maxSize: 10 * 1024,
					},
				},
				generator: {
					filename: 'images/[base]',
				},
			},
			{
				test: /\.txt|xlsx/,
				type: 'asset',
				generator: {
					filename: 'files/[base]',
				},
			},
		],
	},
	plugins: [
		// new WebpackBar(),
		new FriendlyErrorsWebpackPlugin(),
		new MiniCssExtractPlugin(),
		new HtmlWebpackPlugin({
			template: 'src/index.html',
		}),
		new Webpack.HotModuleReplacementPlugin(),
		new CleanWebpackPlugin(),
		new VueLoaderPlugin(),
		new Webpack.ProvidePlugin({
			Vue: ['vue/dist/vue.esm.js', 'default'],
		}),
		new Webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
		}),
	],
	resolve: {
		extensions: ['.ts', '.js', '.vue'],
		plugins: [
			// 将 tsconfig 中配置的路径别名映射到 webpack.resolve.alias 上
			new TsconfigPathsPlugin(),
		],
	},
	// devtool: process.env.NODE_ENV === 'development' ? 'eval-source-map' : '',
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		open: false,
		port: 8888,
		host: '0.0.0.0',
		compress: true,
		hot: true,
		clientLogLevel: 'silent',
		noInfo: false,
		useLocalIp: true,
	},
} as Webpack.Configuration;
