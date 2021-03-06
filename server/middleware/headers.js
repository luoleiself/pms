const url = require("url");
const hostName = require("../config/host.json");

exports = module.exports = async (ctx, next) => {
  let startTime = Date.now();

  await next();

  let endTime = Date.now();
  ctx.set({
    "Access-Control-Allow-Credentials": true,
    // "Access-Control-Allow-Origin": `${url.format(hostName.client)}`,
    "Access-Control-Allow-Origin": `${ctx.request.headers.origin}`,
    "Access-Control-Allow-Headers":
      "Content-Type,X-Requested-With,Cache-Control,Authorization,token",
    "Access-Control-Allow-Methods": "OPTIONS,GET,POST,DELETE,PUT",
    // "Cache-Control": "max-age=86400,must-revalidate",
    "Cache-Control": "no-cache",
    pragma: "no-cache",
    "X-Response-Time": `${endTime - startTime}ms`,
    // "X-Frame-Options": deny,
    // "X-Frame-Options": sameorigin,
    // "X-Frame-Options": 'allow-from http://localhost:9998/',
  });
};
