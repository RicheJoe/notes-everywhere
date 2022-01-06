const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const myWebpackPlugin = require("./src/myWebpackPlugin");
module.exports = {
  entry: "./src/index.js",
  // output: {
  //   filename: "index.js",
  //   path: path.join(__dirname, "output")
  // },
  //loader
  module: {
    rules: [
      {
        test: /.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /.png$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10 * 1024
          }
        }
      },
      {
        test: /\.m?js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /.md$/,
        use: ["html-loader", "./markdown-loader"]
      }
    ]
  },
  //plugin 插件
  plugins: [
    new CleanWebpackPlugin(), //清空dist
    //生成index.html  默认
    new HtmlWebpackPlugin({
      title: "webpack-plugin-sample"
      // template: "index.html" //会根据目录下得index.html生成dist打包后得html页面
    }),
    new HtmlWebpackPlugin({
      filename: "about.html",
      title: "about页面"
    }),
    //直接拷贝不需要打包得内容
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "./public"),
          to: path.resolve(__dirname, "./dist/public")
        }
      ]
    }),
    //自己得插件  删除注释  但是mode为production情况下会自动清空
    new myWebpackPlugin()
  ],
  optimization: {
    //模块只导出被使用得成员
    usedExports: true,
    //尽可能合并每一个模块到一个函数中，这个功能成为scope hoisting 这个概念
    //是在webpack3中提出得
    concatenateModules: true,
    //压缩输出结果，删除未使用得成员
    minimize: true
  }
};
