module.exports = {
  publicPath: "./",
  devServer: {
    // host: "127.0.0.1",
    // hot: true,
    // open: true,
    port: 8080,
    proxy: {
      "/api": {
        // target: "http://10.20.40.80:9013", //开发环境
        target: "http://36.110.140.237:6068", //开发环境-荣耀
        changeOrigin: true,
        pathRewrite: {
          // "^/api": "",
        },
      },
    },
  },
  configureWebpack: {
    resolve: {
      // 别名
      alias: {
        assets: "@/assets",
        components: "@/components",
        utils: "@/common/utils",
      },
    },
  },
};
