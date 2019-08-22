exports = module.exports = async (ctx, next) => {
  let { resData, jwt } = ctx;

  /*  // 模拟生产环境 非登陆接口需要验证token
  if (!ctx.path.toLowerCase().includes("api/login") && !ctx.request.headers.token) {
    resData.code = 10401;
    resData.msg = "签名认证失败!";
    ctx.body = resData;
    return;
  } */

  if (ctx.request.headers.token) {
    if (!jwt.verify(ctx.request.headers.token)) {
      resData.code = 10401;
      resData.msg = "登陆超时!";
      ctx.body = resData;
      return;
    } else {
      ctx.user = jwt.decode(ctx.request.headers.token);
    }
  }

  if (ctx.method.toUpperCase() == "OPTIONS") {
    ctx.body = 200;
    return;
  } else {
    await next();
  }

  let token = ctx.token;
  if (token) {
    ctx.set({ token });
  }
};
