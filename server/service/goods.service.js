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
    "manufactor_id"
  ],
  async findByPages(ctx, models) {
    let { logUtils, dbQuery } = ctx;
    try {
      return await models.goods.findAndCountAll({
        offset: dbQuery.offset,
        limit: dbQuery.limit,
        attributes: this.attributes,
        include: [{ model: models.brands }, models.categories, models.manufactors]
      });
    } catch (error) {
      logUtils.logError(ctx, error);
    }
  },
  async findById(ctx, models) {
    let { logUtils } = ctx;
    try {
      let id = Number(ctx.params.id);
      return await models.goods.findOne({
        where: { id: id },
        attributes: this.attributes,
        include: [{ model: models.brands }, models.categories, models.manufactors]
      });
    } catch (error) {
      logUtils.logError(ctx, error);
    }
  },
  async add(ctx, models) {
    let {
      logUtils,
      request: { body }
    } = ctx;
    try {
      return await models.goods.findOrCreate({
        where: { name: body.name },
        defaults: {
          keys: body.keys,
          desc: body.desc,
          status: body.status,
          brand_id: body.brand_id,
          category_id: body.category_id,
          manufactor_id: body.manufactor_id,
          create_time: Math.floor(Date.now() / 1000)
        }
      });
    } catch (error) {
      logUtils.logError(ctx, error);
    }
  },
  async update(ctx, models) {
    let {
      logUtils,
      request: { body }
    } = ctx;
    const Op = models.Sequelize.Op;
    try {
      let id = Number(ctx.params.id);
      let goodsStore = await models.goods.findOne({
        where: { name: body.name, id: { [Op.not]: id } }
      });
      let goods = await this.findById(ctx, models);
      if (goodsStore) {
        return { code: 0, msg: "商品名称已存在" };
      }
      if (!goods) {
        return { code: 0, msg: "该商品不存在!" };
      }

      goods.name = body.name;
      goods.keys = body.keys;
      goods.desc = body.desc;
      goods.status = body.status;
      goods.brand_id = body.brand_id;
      goods.category_id = body.category_id;
      goods.manufactor_id = body.manufactor_id;
      goods.update_time = Math.floor(Date.now() / 1000);

      await goods.save();
      return goods;
    } catch (error) {
      logUtils.logError(ctx, error);
    }
  },
  async delete(ctx, models) {
    let { logUtils } = ctx;
    try {
      let goods = await this.findById(ctx, models);
      if (!goods) {
        return null;
      }
      goods.status = false;
      await goods.save();
      return goods;
    } catch (error) {
      logUtils.logError(ctx, error);
    }
  }
};
