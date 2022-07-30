const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const path = require("path");

const BUILD_TIME_MILLIS = new Date().getTime();
const projectPackage = require("./package.json");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
  mode: "development",
  cache: {
    type: "filesystem",
  },
  target: "web",
  watch: false,
  entry: "./src/index.ts",
  output: {
    filename: "main.js",
  },
  devtool: "inline-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      title: projectPackage.name,
    }),
    new webpack.DefinePlugin({
      NAME: JSON.stringify(projectPackage.name),
      VERSION: JSON.stringify(projectPackage.version),
      PROJECT_PACKAGE: JSON.stringify(projectPackage),
      BUILD_TIME_MILLIS: BUILD_TIME_MILLIS,
    }),
  ],
  devServer: {
    // https: true,
    open: {
      app: {
        name: "Google Chrome",
      },
    },

    static: {
      directory: path.resolve(__dirname, "assets"),

    },
    // http2: true, // http2 broken in devserver https://github.com/webpack/webpack-dev-server/issues/1713
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",

      // @see https://developer.chrome.com/blog/enabling-shared-array-buffer/
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
    },
  },
  resolve: {
    preferRelative: true,
    plugins: [new TsconfigPathsPlugin()],
    extensions: [".tsx", ".ts", ".js"],
    fallback: {
      crypto: false,
      buffer: false,
      fs: false,
      tls: false,
      net: false,
      path: false,
      zlib: false,
      http: false,
      https: false,
      stream: false,
      child_process: false,
    },
    alias: {
      react: path.resolve("./node_modules/react"),
    },
  },
  module: {
    rules: [
      // web workers
      // {
      //   test: /\.worker\.js$/,
      //   use: { loader: "worker-loader" },
      // },
      // html
      {
        test: /\.html$/i,
        loader: "raw-loader",
        // options: {
        //   // Disables attributes processing
        //   sources: false,
        // },
      },
      // css
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      // typescript
      {
        test: /\.tsx?$/,
        // use: 'ts-loader',
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              compilerOptions: {
                module: "esnext",
              },
            },
          },
        ],
        exclude: /node_modules/,
      },

    ],
  },
  optimization: {
    minimize: false,
    minimizer: [
      new TerserPlugin({
        // cache: true,
        parallel: true,
        // sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          keep_fnames: /AbortSignal/, // needed for node-fetch
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
          output: {
            comments: false,
          },
        },
        extractComments: true,
      }),
    ],
    // splitChunks: {
    //   chunks: "all"
    // },

    // splitChunks: {
    //   cacheGroups: {
    //     commons: {
    //       test: /[\\/]node_modules[\\/]/,
    //       name: "vendor",
    //       chunks: "initial",
    //     },
    //   },
    // },
    // runtimeChunk: "single",
    // splitChunks: {
    //   cacheGroups: {
    //     vendor: {
    //       test: /[\\\/]node_modules[\\\/]/,
    //       name: "vendors",
    //       chunks: "all",
    //     },
    //     styles: {
    //       name: "styles",
    //       test: /\.css$/,
    //       chunks: "all",
    //       enforce: true,
    //     },
    //   },
    // },
  },
};

