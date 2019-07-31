exports = module.exports = {
  // 按时间范围统计产品销售数量
  async sumSalesAmountByTime(ctx, models) {
    let { Op } = ctx;
    let end_time = Math.floor(Date.now() / 1000);
    let start_time = end_time - 2592000;
    let result = await models.sequelize.query(
      "SELECT id,price,goods_id,SUM(amount) AS total,create_time,update_time FROM sales WHERE create_time >= :start_time AND create_time <= :end_time GROUP BY goods_id LIMIT 5",
      {
        replacements: { start_time, end_time },
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
  // 按时间范围统计产品销售数量
  async sumPurchaseAmountByTime(ctx, models) {
    let { Op } = ctx;
    let end_time = Math.floor(Date.now() / 1000);
    let start_time = end_time - 2592000;
    let result = await models.sequelize.query(
      "SELECT id,price,goods_id,SUM(amount) AS total,create_time,update_time FROM purchase WHERE create_time >= :start_time AND create_time <= :end_time GROUP BY goods_id LIMIT 5",
      {
        replacements: { start_time, end_time },
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
  }

/* 
  // 按分类id统计采购总数并降序排序
  select p.id as p_id,p.price,sum(p.amount) as total,p.goods_id,g.id as g_id,g.name as g_name,g.category_id,c.id as c_id,c.name as c_name from purchase p left join goods g on p.goods_id = g.id left join categories c on g.category_id = c.id group by c_id order by total desc;

  // 查询销售记录不为空的商品销售记录；
  select g.id as goods_id,g.name as goods_name,g.amount as goods_amount,s.id as sales_id, s.amount as sales_amount,s.price as sales_price,s.create_time as sales_create_time from  goods g left join sales s on g.id = s.goods_id where s.amount is not null; 
*/
};
