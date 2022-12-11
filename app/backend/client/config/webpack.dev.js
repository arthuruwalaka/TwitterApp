const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const autoprefixer = require("autoprefixer");
const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");
// const BundleTracker = require("webpack-bundle-tracker");

const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
	// Set the mode to development or production
	mode: "development",

	// Control how source maps are generated
	devtool: "cheap-module-source-map",

	// Spin up a server for quick development
	// entry: [
	// 	require.resolve("webpack-dev-server/client") + "?http://localhost:3000",
	// 	require.resolve("webpack/hot/dev-server"),
	// ],
	devServer: {
		historyApiFallback: true,
		open: true,
		compress: true,
		hot: true,
		port: 3000,
		allowedHosts: "auto",
		headers: {
			"Access-Control-Allow-Origin": "*",
		},
		proxy: {
			"/api": {
				target: "http://127.0.0.1:9000",
				secure: false,
				changeOrigin: true,
			},
		},
	},
	target: "web",
	module: {
		rules: [
			// Styles: Inject CSS into the head with source maps
			{
				test: /\.(sass|scss|css)$/,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: { sourceMap: true, importLoaders: 1, modules: false },
					},
					{
						loader: "resolve-url-loader",
					},
					{ loader: "postcss-loader", options: { sourceMap: true } },
					{ loader: "sass-loader", options: { sourceMap: true } },
				],
			},
		],
	},

	plugins: [
		new ReactRefreshPlugin(),
		new ErrorOverlayPlugin(),
		// new BundleTracker({ path: paths.statsRoot, filename: "webpack-stats.dev.json" }),
	],
});
