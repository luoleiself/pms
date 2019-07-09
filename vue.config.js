module.exports = {
  lintOnSave: false,
  devServer: {
    port: 8080,
    host: "localhost"
  },
  // 链式调用配置
  chainWebpack: config => {
    // 配置开发和生产环境变量
    config.plugin("define").tap(args => {
      args[0]["process.env"].REQUEST_URL =
        process.env.NODE_ENV === "production"
          ? JSON.stringify("http://localhost:8888/api")
          : JSON.stringify("http://localhost:8888/api");
      return args;
    });
  }
};
