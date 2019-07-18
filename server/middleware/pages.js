exports = module.exports = async (ctx, next) => {
  let p = Number(ctx.query.p || 1);
  let p_size = Number(ctx.query.p_size || 10);
  let limit = p_size;
  let offset = (p - 1) * p_size;
  let keys = ctx.query.keys;
  let orderBy = ctx.query.orderBy || "create_time,desc";
  let status = "";
  if (ctx.query.status === "0") {
    status = [0];
  } else if (ctx.query.status === "1") {
    status = [1];
  } else {
    status = [1, 0];
  }

  ctx.dbQuery = {
    p,
    p_size,
    limit,
    offset,
    status,
    keys,
    orderBy
  };
  await next();
};
