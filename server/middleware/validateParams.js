exports = module.exports = async (ctx, next) => {
  let { resData, query } = ctx;

  // 验证请求参数是否非法
  if (
    (query.p && query.p.search(/^([0-9]*?)$/) == -1) ||
    (query.p_size && query.p_size.search(/^([0-9]*?)$/) == -1) ||
    (query.status && query.status.search(/^(0|1|true|false)$/i) == -1)
  ) {
    resData.code = 10400;
    resData.msg = "请求参数错误!";
    ctx.body = resData;
    return;
  }

  let offset = null;
  let limit = null;
  let status = "";
  let keys = query.keys;
  let orderBy = query.orderBy || "create_time,desc"; // 默认排序字段

  if (query.p_size) {
    limit = Number(query.p_size);
    offset = Number(query.p) ? (Number(query.p) - 1) * limit : 0 * limit;
  }

  if (query.status) {
    if (query.status === "0" || query.status.toLowerCase() === "false") {
      status = [0];
    } else if (query.status === "1" || query.status.toLowerCase() === "true") {
      status = [1];
    }
  } else {
    status = [1, 0];
  }

  ctx.dbQuery = {
    status,
    keys,
    orderBy,
    limit,
    offset,
    p: query.p,
    p_size: query.p_size
  };
  await next();
};
