const path = require("path");
exports = module.exports = {
  appenders: {
    access: {
      type: "dateFile",
      pattern: "-yyyy-MM-dd.log",
      alwaysIncludePattern: true,
      encoding: "utf-8",
      filename: path.resolve(__dirname, "./log", "./access/access.log")
    },
    error: {
      type: "dateFile",
      pattern: "-yyyy-MM-dd.log",
      alwaysIncludePattern: true,
      encoding: "utf-8",
      filename: path.resolve(__dirname, "./log", "./error/error.log")
    },
    out: {
      type: "console"
    }
  },
  category: {
    default: { appenders: ["out"], level: "info" },
    access: { appenders: ["access"], level: "info" },
    error: { appenders: ["error"], level: "error" }
  }
};
