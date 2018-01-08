var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    bundle: "./src/index.js"
  },
  output: {
    path: path.join(__dirname, "dist"),
    // Note on Cache Busting
    //
    // Chunkhash is a hash of the file contents.
    // When contents change, hash changes, so name changes, so browser gets a new version instead of using cached version.
    filename: "[name].[chunkhash].js",
    // HTMLWebpackPlugin uses the publicpath in the routes for its inserted JS and CSS.
    // Specify '/' otherwise the JS and CSS paths will be relative, which breaks on any non-root URL.
    // http://stackoverflow.com/questions/34620628/htmlwebpackplugin-injects-relative-path-files-which-breaks-when-loading-non-root
    publicPath: "/"
  },
  module: {
    // Webpack 1 had "loaders", Webpack 2 has "rules".
    rules: [
      {
        // Babel dependencies:
        // babel-loader = teach babel how to work with webpack
        // babel-core = take input code, ouput files
        // babel-preset-env = ruleset for telling babel how to transform code
        //
        // .babelrc:
        // Tells babel what presets to use.
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        // CSS is imported in app.js.
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    // Define environment variables that are accessible inside of react app's javascript.
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        API_HOST: JSON.stringify(process.env.API_HOST)
      }
    }),
    // Adds bundled file links to the index.html... I think.
    new HtmlWebpackPlugin({
      template: "src/index.dev.ejs",
      inject: true
    })
  ],
  // TODO: This doesn't work, going to /signup while running dev will still result in a 404 instead of webpack-dev-server picking it up.
  devServer: {
    port: 3000,
    historyApiFallback: {
      index: "index.dev.ejs"
    }
  },
  // TODO: This doesn't work, in Chrome we still see bundle.js errors.
  devtool: "cheap-module-source-map"
};
