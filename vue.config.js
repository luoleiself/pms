const hostName = require("./server/config/host.json");
const url = require("url");

module.exports = {
  lintOnSave: false,
  devServer: {
    port: hostName.client.port,
    host: hostName.client.hostName
  },
  // 链式调用配置
  chainWebpack: config => {
    // 配置开发和生产环境变量
    config.plugin("define").tap(args => {
      args[0]["process.env"].REQUEST_URL =
        process.env.NODE_ENV === "production"
          ? JSON.stringify(`${url.format(hostName.server)}`)
          : JSON.stringify(`${url.format(hostName.server)}`);
      return args;
    });
  }
};
