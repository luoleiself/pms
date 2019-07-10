exports = module.exports = async (ctx, next) => {
  let p = Number(ctx.query.p || 1);
  let p_size = Number(ctx.query.p_size || 10);
  let limit = p_size;
  let offset = (p - 1) * p_size;
  if (ctx.query.status === "0") {
    status = [false];
  } else if (ctx.query.status === "1") {
    status = [true];
  } else {
    status = [true, false];
  }
  ctx.dbQuery = {
    p,
    p_size,
    limit,
    offset,
    status
  };
  await next();
};
