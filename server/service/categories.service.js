exports = module.exports = {
  attributes: ["id", "pid", "name", "desc", "create_time", "update_time", "status"],
  async findByPages(ctx, models) {
    let { logUtils, dbQuery } = ctx;
    try {
      return await models.categories.findAndCountAll({
        offset: dbQuery.offset,
        limit: dbQuery.limit,
        attributes: this.attributes
      });
    } catch (error) {
      logUtils.logError(ctx, error);
    }
  },
  async findById(ctx, models) {
    let { logUtils } = ctx;
    try {
      let id = Number(ctx.params.id);
      return await models.categories.findOne({
        where: { id: id },
        attributes: this.attributes
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
      return await models.categories.findOrCreate({
        where: { name: body.name },
        defaults: {
          pid: body.pid,
          desc: body.desc,
          status: body.status,
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
      let categoriesStore = await models.categories.findOne({
        where: { name: body.name, id: { [Op.not]: id } }
      });
      let categories = await this.findById(ctx, models);
      if (categoriesStore) {
        return { code: 0, msg: "分类名称已存在" };
      }
      if (!categories) {
        return { code: 0, msg: "该分类不存在!" };
      }

      categories.name = body.name;
      categories.pid = body.pid;
      categories.desc = body.desc;
      categories.status = body.status;
      categories.update_time = Math.floor(Date.now() / 1000);

      await categories.save();
      return categories;
    } catch (error) {
      logUtils.logError(ctx, error);
    }
  },
  async delete(ctx, models) {
    let { logUtils } = ctx;
    try {
      let categories = await this.findById(ctx, models);
      if (!categories) {
        return null;
      }
      await categories.destroy();
      return categories;
    } catch (error) {
      logUtils.logError(ctx, error);
    }
  },
  async getTree(ctx, models) {
    let { logUtils } = ctx;
    try {
      let categories = await this.findAll(ctx, models);
      console.log(JSON.stringify(categories));

      return {};
    } catch (error) {
      logUtils.logError(ctx, error);
    }
  },
  async findAll(ctx, models) {
    let { logUtils } = ctx;
    try {
      return await models.categories.findAll({ attributes: this.attributes });
    } catch (error) {
      logUtils.logError(ctx, error);
    }
  }
};
