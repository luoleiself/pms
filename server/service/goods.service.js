exports = module.exports = {
  attributes: [
    "id",
    "name",
    "keys",
    "desc",
    "amount",
    "status",
    "create_time",
    "update_time",
    "brand_id",
    "category_id",
    "operator"
  ],
  // 分页查询全部
  async findAllByPages(ctx, models) {
    let { dbQuery, Op } = ctx;
    let query = {
      where: { status: { [Op.in]: dbQuery.status } },
      order: [dbQuery.orderBy.split(",")],
      offset: dbQuery.offset,
      limit: dbQuery.limit,
      attributes: this.attributes,
      include: [
        { model: models.categories },
        { model: models.brands, include: [{ model: models.manufactors }] }
      ]
    };
    if (dbQuery.keys) {
      query.where.name = { [Op.substring]: dbQuery.keys };
    }
    if (dbQuery.category_id) {
      query.where.category_id = dbQuery.category_id;
    }
    if (dbQuery.brand_id) {
      query.where.brand_id = dbQuery.brand_id;
    }
    return await models.goods.findAndCountAll(query);
  },
  // 按条件查询全部不分页
  async findAllByParams(ctx, models) {
    let { dbQuery, Op } = ctx;
    let query = {
      where: { status: { [Op.in]: dbQuery.status } },
      order: [dbQuery.orderBy.split(",")],
      attributes: this.attributes,
      include: [{ model: models.brands, include: { model: models.manufactors } }, models.categories]
    };
    if (dbQuery.keys) {
      query.where.name = { [Op.substring]: dbQuery.keys };
    }
    return await models.goods.findAll(query);
  },
  async findById(ctx, models) {
    let id = Number(ctx.params.id);
    return await models.goods.findOne({
      where: { id: id },
      attributes: this.attributes,
      include: [{ model: models.brands, include: { model: models.manufactors } }, models.categories]
    });
  },
  async add(ctx, models) {
    let {
      request: { body },
      user
    } = ctx;
    return await models.goods.findOrCreate({
      where: { name: body.name },
      defaults: {
        keys: body.keys,
        desc: body.desc,
        status: body.status,
        brand_id: body.brand_id,
        category_id: body.category_id,
        operator: user.payload.name,
        create_time: Math.floor(Date.now() / 1000)
      }
    });
  },
  async update(ctx, models) {
    let {
      request: { body },
      user
    } = ctx;
    let goods = await this.findById(ctx, models);
    if (!goods) {
      return null;
    }

    goods.name = body.name;
    goods.keys = body.keys;
    goods.desc = body.desc;
    goods.status = body.status;
    goods.brand_id = body.brand_id;
    goods.category_id = body.category_id;
    goods.operator = user.payload.name;
    goods.update_time = Math.floor(Date.now() / 1000);

    await goods.save();
    return goods;
  },
  async delete(ctx, models) {
    let goods = await this.findById(ctx, models);
    if (!goods) {
      return null;
    }
    goods.status = false;
    await goods.save();
    return goods;
  }
};
