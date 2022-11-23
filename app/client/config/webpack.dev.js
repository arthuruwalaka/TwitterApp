const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");

const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
	// Set the mode to development or production
	mode: "development",

	// Control how source maps are generated
	devtool: "cheap-module-source-map",

	// Spin up a server for quick development
	devServer: {
		historyApiFallback: true,
		open: true,
		compress: true,
		hot: true,
		port: 3000,
		headers: {
			"Access-Control-Allow-Origin": "*",
		},
		proxy: {
			"/api": {
				target: "http://[::1]:9000",
				pathRewrite: { "^/api": "" },
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

	plugins: [new ReactRefreshPlugin(), new ErrorOverlayPlugin()],
});
