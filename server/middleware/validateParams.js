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
  let orderBy = query.orderBy || "update_time,desc"; // 默认排序字段
  let start_time = query.start_time;
  let end_time = query.end_time;
  let goods_id = query.goods_id;
  let brand_id = query.brand_id;
  let category_id = query.category_id;
  let manufactor_id = query.manufactor_id;

  if (query.p_size) {
    limit = Number(query.p_size);
    offset = Number(query.p) ? (Number(query.p) - 1) * limit : 0 * limit;
    query.p = query.p ? +query.p : 1;
    query.p_size = +query.p_size;
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
    p: query.p,
    p_size: query.p_size,
    limit,
    offset,
    orderBy,
    status,
    keys,
    goods_id,
    category_id,
    brand_id,
    manufactor_id,
    start_time,
    end_time
  };
  await next();
};
