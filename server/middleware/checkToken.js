exports = module.exports = async (ctx, next) => {
  let { resData, jwt } = ctx;
  if (ctx.request.headers.token && !jwt.verify(ctx.request.headers.token)) {
    resData.code = 10401;
    resData.msg = "用户未登录!";
    ctx.body = resData;
    return;
  }

  if (ctx.method.toUpperCase() == "OPTIONS") {
    ctx.body = 200;
    return
  } else {
    await next();
  }

  let token = ctx.token;
  if (token) {
    ctx.set({ token });
  }
};
