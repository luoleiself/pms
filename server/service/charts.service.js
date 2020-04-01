exports = module.exports = {
  // 按时间范围统计产品出库数量
  async sumSalesAmountByTime(ctx, models) {
    let { dbQuery, Op } = ctx;
    if (!dbQuery.p_size) {
      dbQuery.p_size = 5;
    }
    let end_time = Math.floor(new Date(new Date().toLocaleDateString()).getTime() / 1000);
    let start_time = end_time - 2592000;
    end_time += 86399;
    let result = await models.sequelize.query(
      "SELECT id,goods_id,SUM(amount) AS total,create_time,update_time FROM sales WHERE create_time >= :start_time AND create_time <= :end_time GROUP BY goods_id LIMIT :limit",
      {
        replacements: { start_time, end_time, limit: dbQuery.p_size },
        type: models.sequelize.QueryTypes.SELECT,
        raw: true
      }
    );
    let ids = result.map(item => item.goods_id);
    let goods = await models.goods.findAll({ where: { id: { [Op.in]: ids } } }, { ras: true });
    goods = JSON.parse(JSON.stringify(goods));
    result = result.map(item => {
      let good = goods.find(val => val.id == item.goods_id);
      return { ...item, goods: good };
    });
    return result;
  },
  // 按时间范围统计产品出库数量
  async sumPurchaseAmountByTime(ctx, models) {
    let { dbQuery, Op } = ctx;
    if (!dbQuery.p_size) {
      dbQuery.p_size = 5;
    }
    let end_time = Math.floor(new Date(new Date().toLocaleDateString()).getTime() / 1000);
    let start_time = end_time - 2592000;
    end_time += 86399;
    let result = await models.sequelize.query(
      "SELECT id,goods_id,SUM(amount) AS total,create_time,update_time FROM purchase WHERE create_time >= :start_time AND create_time <= :end_time GROUP BY goods_id LIMIT :limit",
      {
        replacements: { start_time, end_time, limit: dbQuery.p_size },
        type: models.sequelize.QueryTypes.SELECT,
        raw: true
      }
    );
    let ids = result.map(item => item.goods_id);
    let goods = await models.goods.findAll({ where: { id: { [Op.in]: ids } } }, { ras: true });
    goods = JSON.parse(JSON.stringify(goods));
    result = result.map(item => {
      let good = goods.find(val => val.id == item.goods_id);
      return { ...item, goods: good };
    });
    return result;
  },
  // 统计各分类下的商品个数
  async statGoodsByCategory(ctx, models) {
    let result = await models.sequelize.query(
      "SELECT g.category_id,count(c.id) AS amount,c.name AS category_name,c.desc,c.status,c.create_time,c.update_time,GROUP_CONCAT(g.name) AS goods_name FROM goods g LEFT JOIN categories c ON g.category_id = c.id GROUP BY c.id",
      {
        type: models.sequelize.QueryTypes.SELECT,
        raw: true
      }
    );
    return result;
  },
  /* 按月统计出库量和入库量 */
  async statSalesPurchaseByMonth(ctx, models) {
    let end_time = Math.floor(new Date(new Date().toLocaleDateString()).getTime() / 1000);
    let start_time = end_time - 2592000;
    end_time += 86399;
    let sales = await models.sequelize.query(
      "SELECT s.id AS sales_id,s.amount AS sales_amount,s.create_time AS sales_create_time,s.goods_id,g.name AS goods_name FROM sales s LEFT JOIN goods g ON s.goods_id = g.id WHERE s.create_time >= :start_time AND s.create_time <= :end_time",
      {
        replacements: { start_time, end_time },
        type: models.sequelize.QueryTypes.SELECT,
        raw: true
      }
    );
    let purchase = await models.sequelize.query(
      "SELECT p.id AS purchase_id,p.amount AS purchase_amount,p.create_time AS purchase_create_time,p.goods_id,g.name AS goods_name FROM purchase p LEFT JOIN goods g ON p.goods_id = g.id WHERE p.create_time >= :start_time AND p.create_time <= :end_time",
      {
        replacements: { start_time, end_time },
        type: models.sequelize.QueryTypes.SELECT,
        raw: true
      }
    );
    let timeArr = [];
    let sObj = { name: "出库", type: "line", data: [] };
    let pObj = { name: "入库", type: "line", data: [] };
    let flag = true;
    while (flag) {
      if (start_time > end_time) {
        flag = false;
        break;
      }
      let salesTemp = sales.filter(
        item => item.sales_create_time >= start_time && item.sales_create_time <= start_time + 86399
      );
      let purchaseTemp = purchase.filter(
        item =>
          item.purchase_create_time >= start_time && item.purchase_create_time <= start_time + 86399
      );
      sObj.data.push(salesTemp.reduce((acc, cur) => acc + cur.sales_amount, 0));
      pObj.data.push(purchaseTemp.reduce((acc, cur) => acc + cur.purchase_amount, 0));
      timeArr.push(start_time);
      start_time += 86400;
    }
    return {
      timeArr,
      sales: sObj,
      purchase: pObj
    };
  }
};
