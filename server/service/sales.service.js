exports = module.exports = {
  attributes: ["id", "price", "amount", "create_time", "update_time", "goods_id"],
  async findByPages(ctx, models) {
    let { dbQuery } = ctx;
    return await models.sales.findAndCountAll({
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
    return await models.sales.findOne({
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
    let sales = models.sales.build({
      price: body.price,
      amount: body.amount,
      goods_id: body.goods_id,
      create_time: Math.floor(Date.now() / 1000)
    });
    let goods = await models.goods.findOne({ where: { id: body.goods_id } });
    if (body.amount > goods.amount) {
      return { code: 0, msg: "销售数量不能大于库存数量!" };
    }
    goods.amount -= Number(body.amount);

    await goods.save();
    await sales.save();
    ctx.params.id = sales.id;

    return await this.findById(ctx, models);
  },
  async update(ctx, models) {
    let {
      request: { body }
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
  }
};
