exports = module.exports = {
  attributes: ["id", "price", "amount", "create_time", "update_time", "goods_id"],
  async findByPages(ctx, models) {
    let { dbQuery } = ctx;
    return await models.purchase.findAndCountAll({
      offset: dbQuery.offset,
      limit: dbQuery.limit,
      attributes: this.attributes,
      include: {
        model: models.goods,
        include: [
          { model: models.categories },
          { model: models.brands },
          { model: models.manufactors }
        ]
      }
    });
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
          { model: models.brands },
          { model: models.manufactors }
        ]
      }
    });
  },
  async add(ctx, models) {
    let {
      request: { body }
    } = ctx;
    let purchase = models.purchase.build({
      price: body.price,
      amount: body.amount,
      goods_id: body.goods_id,
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
      request: { body }
    } = ctx;
    let purchase = await this.findById(ctx, models);
    if (!purchase) {
      return { code: 0, msg: "该采购信息不存在!" };
    }
    let goods = await models.goods.findOne({ where: { id: purchase.goods_id } });

    goods.amount -= purchase.amount;
    goods.amount += Number(body.amount);

    purchase.amount = body.amount;
    purchase.price = body.price;
    purchase.goods_id = body.goods_id;
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
