const host = require("./server/config/host.json");
const url = require("url");

module.exports = {
  lintOnSave: false,
  devServer: {
    port: host.client.port,
    host: host.client.hostname
  },
  // 链式调用配置
  chainWebpack: config => {
    // 配置开发和生产环境变量
    config.plugin("define").tap(args => {
      args[0]["process.env"].REQUEST_URL = process.env.NODE_ENV.includes("production")
        ? JSON.stringify(`${url.format(host.server.dev)}`)
        : JSON.stringify(`${url.format(host.server.dev)}`);
      return args;
    });
  }
};
