const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    styles: ["./src/css-reset.css", "./src/style.css",],
    mainPage: ["./src/index.js"],
    navBar: ["./src/navModule.js"],
    newTaskCreation: ["./src/newTaskFormModule.js"],
    tasksList: ["./src/taskListModule.js"]
  },
  devtool: "source-map",
  devServer: {
    static: "./dist",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Waraqah Wa Qalam",
      template: "./src/template.html"
    }),
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: "asset/resource",
      },
    ],
  },
  optimization: {
    runtimeChunk: "single",
  },
};
