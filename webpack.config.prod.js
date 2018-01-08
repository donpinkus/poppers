/*
  The production configuration uses extract text plugin to create a separate CSS file.

  Overkill to have a separate file just for one line, but typically dev and prod builds diverge a lot.
*/

var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

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
    filename: "[name].[chunkhash].js"
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
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        // CSS is imported in app.js.
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"]
        })
      }
    ]
  },
  plugins: [
    // Adds bundled file links to the index.html
    new HtmlWebpackPlugin({
      // The input file name
      template: "src/index.prod.ejs",
      // Injects scripts into the <body>
      inject: true,
      // This is so hacky. I inject a string so the built .ejs file has this template var. Lets us set api_url when server is started instead of at bundle time.
      API_HOST_TEMPLATE_VAR: "<%= process.env.API_HOST %>",
      // The output file name
      filename: "index.ejs"
    }),
    new ExtractTextPlugin("styles.css")
  ]
};
