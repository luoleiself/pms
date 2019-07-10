const CLIENT_PORT = process.env.CLIENT_PORT || 80;

exports = module.exports = async (ctx, next) => {
  let startTime = Date.now();
  await next();
  let endTime = Date.now();
  ctx.set({
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": `http://localhost:${CLIENT_PORT}`,
    "Access-Control-Allow-Headers": "Content-Type,X-Requested-With,Cache-Control,Authorization",
    "Access-Control-Allow-Methods": "GET,POST,DELETE,PUT",
    "Cache-Control": "max-age=86400,must-revalidate",
    "X-Response-Time": `${endTime - startTime}ms`
  });
};
