const log4js = require("log4js");
const config = require("../config/log4js.json");
log4js.configure(config);
let errorLog = log4js.getLogger("error");
let accessLog = log4js.getLogger("access");

/* 文本格式化 */
let formatText = {
  formatErr(ctx, error) {
    return `${formatText.formatReq(ctx)} Error:${error.name} ${error.message}`;
  },
  formatReq(ctx) {
    return `Request: ${ctx.method} ${ctx.origin}${ctx.path}${ctx.search} ${
      ctx.req.body ? JSON.stringify(ctx.req.body) : ""
    }`;
  },
  formatRes(ctx) {
    return `Response: ${ctx.status} ${ctx.message} ${JSON.stringify(ctx.body)}`;
  }
};

exports = module.exports = {
  logError(ctx, error) {
    if (ctx && error) {
      errorLog.error(formatText.formatErr(ctx, error));
    }
  },
  logAccess(ctx) {
    if (!ctx.method.toLowerCase().includes("options")) {
      let logTxt = `${formatText.formatReq(ctx)} ${formatText.formatRes(ctx)}`;
      accessLog.info(logTxt);
    }
  }
};
