const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const BASE_JS="./src/client/js/";

module.exports = {
  entry: {
      main: BASE_JS + "main.js",
      department: BASE_JS + "department.js",
      schedule: BASE_JS + "schedule.js",
      journal: BASE_JS + "journal.js",
      searchJournal: BASE_JS + "searchJournal.js",
      join: BASE_JS + "join.js",
      noticeBoardList: BASE_JS + "noticeBoardList.js",
      readerBoardList: BASE_JS + "readerBoardList.js",
      // CKEditorLoad: BASE_JS + "CKEditorLoad.js",
      //sideBar: BASE_JS + "sideBar.js",
  },
  // resolve: {
  //   extensions: ['.js'],
  // },
  plugins: [
      new MiniCssExtractPlugin({
          filename: "/css/main.css",
      }),
  ],
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "assets"),
    clean: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
};