const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: "./src/core/index.ts",
  devServer: {
    watchFiles: ["./src"],
    static: "./dist",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".html", ".css"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Development",
      template: "src/index.html",
    }),
    new MiniCssExtractPlugin(),
  ],
  output: {
    filename: "bundle.js",
    clean: true,
    path: path.resolve(__dirname, "dist"),
  },
};
