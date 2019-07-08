exports = module.exports = async (ctx, next) => {
  let startTime = Date.now();
  await next();
  let endTime = Date.now();
  ctx.set({
    "Cache-Control": "no-cache",
    "X-Response-Time": `${endTime - startTime}ms`
  });
};
