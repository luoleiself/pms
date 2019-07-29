exports = module.exports = {
  attributes: ["id", "price", "amount", "create_time", "update_time", "operator", "goods_id"],
  async findAllByPages(ctx, models) {
    let { dbQuery, Op } = ctx;
    let query = {
      where: {},
      offset: dbQuery.offset,
      limit: dbQuery.limit,
      attributes: this.attributes,
      include: {
        model: models.goods,
        where: {},
        include: [
          { model: models.categories },
          { model: models.brands, include: [{ model: models.manufactors }] }
        ]
      }
    };
    if (dbQuery.start_time) {
      query.where.create_time = { [Op.gte]: +dbQuery.start_time, [Op.lte]: +dbQuery.end_time };
    }
    if (dbQuery.goods_id) {
      query.include.where.id = dbQuery.goods_id;
    }
    return await models.sales.findAndCountAll(query);
  },
  async findById(ctx, models) {
    let id = Number(ctx.params.id);
    return await models.sales.findOne({
      where: { id: id },
      attributes: this.attributes,
      include: {
        model: models.goods,
        include: [
          { model: models.categories },
          { model: models.brands, include: [{ model: models.manufactors }] }
        ]
      }
    });
  },
  async add(ctx, models) {
    let {
      request: { body },
      user
    } = ctx;
    let sales = models.sales.build({
      price: body.price,
      amount: body.amount,
      goods_id: body.goods_id,
      operator: user.payload.name,
      create_time: Math.floor(Date.now() / 1000)
    });
    let goods = await models.goods.findOne({ where: { id: body.goods_id } });
    if (body.amount > goods.amount) {
      return null;
    }
    goods.amount -= Number(body.amount);

    await goods.save();
    await sales.save();
    ctx.params.id = sales.id;

    return await this.findById(ctx, models);
  },
  async update(ctx, models) {
    let {
      request: { body },
      user
    } = ctx;
    let sales = await this.findById(ctx, models);
    if (!sales) {
      return { code: 0, msg: "该销售信息不存在!" };
    }
    let goods = await models.goods.findOne({ where: { id: sales.goods_id } });

    if (body.amount > goods.amount + sales.amount) {
      return { code: 0, msg: "销售数量不能大于库存数量!" };
    }

    goods.amount += sales.amount;
    goods.amount -= Number(body.amount);

    sales.amount = body.amount;
    sales.price = body.price;
    sales.goods_id = body.goods_id;
    sales.operator = user.payload.name;
    sales.update_time = Math.floor(Date.now() / 1000);

    await sales.save();
    await goods.save();

    return await this.findById(ctx, models);
  },
  async delete(ctx, models) {
    let sales = await this.findById(ctx, models);
    if (!sales) {
      return null;
    }
    let goods = await models.goods.findOne({ where: { id: sales.goods_id } });
    goods.amount += sales.amount;
    await sales.destroy();
    await goods.save();
    return sales;
  },
  // 按时间范围统计产品销售数量
  async sumSalesAmountByTime(ctx, models) {
    let { Op } = ctx;
    let end_time = Math.floor(Date.now() / 1000);
    let start_time = end_time - 2592000;
    let result = await models.sequelize.query(
      "SELECT id,price,goods_id,SUM(amount) AS total,create_time,update_time FROM sales WHERE create_time >= :start_time AND create_time <= :end_time GROUP BY goods_id LIMIT 10",
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
  }
};
