const SERVER_PORT = process.env.SERVER_PORT || 80;
const CLIENT_PORT = process.env.CLIENT_PORT || 80;

module.exports = {
  lintOnSave: false,
  devServer: {
    port: CLIENT_PORT,
    host: "localhost"
  },
  // 链式调用配置
  chainWebpack: config => {
    // 配置开发和生产环境变量
    config.plugin("define").tap(args => {
      args[0]["process.env"].REQUEST_URL =
        process.env.NODE_ENV === "production"
          ? JSON.stringify(`http://localhost:${SERVER_PORT}/api`)
          : JSON.stringify(`http://localhost:${SERVER_PORT}/api`);
      return args;
    });
  }
};
