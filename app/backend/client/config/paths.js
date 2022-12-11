const path = require("path");
const fs = require("fs");
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
	// Source files
	src: path.resolve(__dirname, "../src"),

	// Production build files
	build: path.resolve(__dirname, "../dist"),

	// Static files that get copied to build folder
	public: path.resolve(__dirname, "../public"),

	statsRoot: resolveApp("../"),

	backend: path.resolve(__dirname, "../../"),
};
