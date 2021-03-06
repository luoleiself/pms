exports = module.exports = {
  attributes: ["id", "amount", "create_time", "update_time", "operator", "goods_id"],
  async findAllByPages(ctx, models) {
    let { dbQuery, Op } = ctx;
    let query = {
      where: {},
      order: [
        dbQuery.orderBy.split(","),
        dbQuery.orderBy.includes("create_time")
          ? "update_time,desc".split(",")
          : "create_time,desc".split(",")
      ],
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
    return await models.purchase.findAndCountAll(query);
  },
  async findById(ctx, models) {
    let id = Number(ctx.params.id);
    return await models.purchase.findOne({
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
    let purchase = models.purchase.build({
      amount: body.amount,
      goods_id: body.goods_id,
      operator: user.payload.name,
      create_time: Math.floor(Date.now() / 1000)
    });
    let goods = await models.goods.findOne({ where: { id: body.goods_id } });
    goods.amount += Number(body.amount);

    await goods.save();
    await purchase.save();

    return await models.purchase.findOne({ where: { id: purchase.id }, include: [models.goods] });
  },
  async update(ctx, models) {
    let {
      request: { body },
      user
    } = ctx;
    let purchase = await this.findById(ctx, models);
    if (!purchase) {
      return null;
    }
    let goods = await models.goods.findOne({ where: { id: purchase.goods_id } });

    goods.amount -= purchase.amount;
    goods.amount += Number(body.amount);

    purchase.amount = body.amount;
    purchase.goods_id = body.goods_id;
    purchase.operator = user.payload.name;
    purchase.update_time = Math.floor(Date.now() / 1000);

    await goods.save();
    await purchase.save();

    return await this.findById(ctx, models);
  },
  async delete(ctx, models) {
    let purchase = await this.findById(ctx, models);
    if (!purchase) {
      return null;
    }
    let goods = await models.goods.findOne({ where: { id: purchase.goods_id } });
    goods.amount -= Number(purchase.amount);
    await purchase.destroy();
    await goods.save();
    return purchase;
  }
};
