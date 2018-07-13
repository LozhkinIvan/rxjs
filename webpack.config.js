const path = require('path');

module.exports = {
	entry: {
		"index": path.join(__dirname, '/examples/index.ts'),
		"example-1": path.join(__dirname, '/examples/example-1/index.ts'),
		"example-2": path.join(__dirname, '/examples/example-2/index.ts'),
		"example-3": path.join(__dirname, '/examples/example-3/index.ts'),
		"example-4": path.join(__dirname, '/examples/example-4/index.ts'),
		"example-5": path.join(__dirname, '/examples/example-5/index.ts'),
		"example-6": path.join(__dirname, '/examples/example-6/index.ts'),
	},
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{				
				test: /\.scss$/,
				use: [
					"style-loader", // creates style nodes from JS strings
					"css-loader", // translates CSS into CommonJS
					"sass-loader" // compiles Sass to CSS
				]
			}
		]
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	},
	devServer: {
		contentBase: 'src',
	},
};