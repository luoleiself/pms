var path = require("path");

//日志根目录
// var baseLogPath = path.resolve(__dirname, "../logs");

/*报错输出日志*/
//错误日志目录、文件名、输出完整路径
// var errorPath = "/error";
// var errorFileName = "error";
// var errorLogPath = baseLogPath + errorPath + "/" + errorFileName;

/*请求数据得到响应时输出响应日志*/
//响应日志目录、文件名、输出完整路径
// var responsePath = "/response";
// var responseFileName = "response";
// var responseLogPath = baseLogPath + responsePath + "/" + responseFileName;

/*操作数据库进行增删改等敏感操作记录日志*/
//操作日志目录、文件名、输出完整路径
// var handlePath = "/handle";
// var handleFileName = "handle";
// var handleLogPath = baseLogPath + handlePath + "/" + handleFileName;

module.exports = {
  //日志格式等设置
  appenders: {
    error: {
      type: "dateFile",
      pattern: "-yyyy-MM-dd hh:mm:ss.log",
      alwaysIncludePattern: true,
      encoding: "utf-8",
      path: path.resolve(__dirname, "../logs", "./error.log")
    },
    out: {
      type: "console"
    }
  },
  //供外部调用的名称和对应设置定义
  categories: {
    default: { appenders: ["out"], level: "all" },
    error: { appenders: ["error"], level: "error" }
  }
};
