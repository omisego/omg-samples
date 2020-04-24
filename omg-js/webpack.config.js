const path = require("path");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isDevelopment = process.env.NODE_ENV === "development";

module.exports = {
  mode: "development",
  entry: {
    app: "./app/index.js",
    balances: "./app/01-balances/balances.js",
    depositETH: "./app/02-deposit-eth/deposit-eth.js",
    depositERC20: "./app/03-deposit-erc20/deposit-erc20.js",
    transactionETH: "./app/04-transaction-eth/transaction-eth.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  devServer: {
    port: 3000,
    contentBase: path.join(__dirname, "dist"),
    hot: false,
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: "OMG-js Samples",
    }),
    new Dotenv({
      path: "./.env",
      safe: false,
      silent: true,
      defaults: false,
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
  ],
  // Windows only
  node: {
    fs: "empty",
    net: "empty",
    tls: "empty",
  },
  module: {
    rules: [
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        loader: [
          isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".scss"],
  },
};
