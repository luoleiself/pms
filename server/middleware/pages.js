exports = module.exports = async (ctx, next) => {
  let p = Number(ctx.query.p || 1);
  let p_size = Number(ctx.query.p_size || 10);
  let limit = p_size;
  let offset = (p - 1) * p_size;
  ctx.dbQuery = {
    p,
    p_size,
    limit,
    offset
  };
  await next();
};
