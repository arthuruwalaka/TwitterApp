const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// const CopyWebpackPlugin = require('copy-webpack-plugin')

const paths = require("./paths");

module.exports = {
	// Where webpack looks to start building the bundle
	entry: [paths.src + "/index.js"],

	// Where webpack outputs the assets and bundles
	output: {
		path: paths.build,
		filename: "bundle.[hash].js",
		publicPath: "/",
	},

	// Customize the webpack build process
	plugins: [
		// Removes/cleans build folders and unused assets when rebuilding
		new CleanWebpackPlugin(),

		// Copies files from target to destination folder
		// new CopyWebpackPlugin({
		// 	patterns: [
		// 		{
		// 			from: paths.public,
		// 			to: "assets",
		// 			globOptions: {
		// 				ignore: ["*.DS_Store"],
		// 			},
		// 			noErrorOnMissing: true,
		// 		},
		// 	],
		// }),

		// Generates an HTML file from a template
		// Generates deprecation warning: https://github.com/jantimon/html-webpack-plugin/issues/1501
		new HtmlWebpackPlugin({
			title: "webpack Boilerplate",
			favicon: paths.public + "/favicon.ico",
			template: paths.public + "/index.html", // template file
			manifest: "./public/manifest.json",
			filename: "index.html", // output file
		}),
	],

	// Determine how modules within the project are treated
	module: {
		rules: [
			// JavaScript: Use Babel to transpile JavaScript files
			{ test: /\.(js|jsx)$/, use: ["babel-loader"] },
			// {
			// 	test: /\.(js|jsx)$/,
			// 	exclude: /node_modules/,
			// 	use: {
			// 		loader: "babel-loader",
			// 		options: {
			// 			presets: [["@babel/preset-env", { targets: "defaults" }], "@babel/preset-react"],
			// 		},
			// 	},
			// },

			// Images: Copy image files to build folder
			{ test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: "asset/resource" },

			// Fonts and SVGs: Inline files
			{ test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: "asset/inline" },
		],
	},
	experiments: {
		topLevelAwait: true,
	},
	resolve: {
		modules: [paths.src, "node_modules"],
		extensions: [".js", ".jsx", ".json"],
		alias: {
			"@": paths.src,
			assets: paths.public,
		},
	},
};
