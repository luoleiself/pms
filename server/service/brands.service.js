const tree = require("../utils/tree");
exports = module.exports = {
  attributes: ["id", "pid", "name", "desc", "create_time", "update_time", "status"],
  async findByPages(ctx, models) {
    let { logUtils, dbQuery } = ctx;
    const Op = models.Sequelize.Op;
    try {
      return await models.brands.findAndCountAll({
        where: { status: { [Op.in]: dbQuery.status } },
        offset: dbQuery.offset,
        limit: dbQuery.limit,
        attributes: this.attributes,
        include: [models.manufactors]
      });
    } catch (error) {
      logUtils.logError(ctx, error);
    }
  },
  async findById(ctx, models) {
    let { logUtils } = ctx;
    try {
      let id = Number(ctx.params.id);
      return await models.brands.findOne({
        where: { id: id },
        attributes: this.attributes,
        include: [models.manufactors]
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
      return await models.brands.findOrCreate({
        where: { name: body.name },
        defaults: {
          pid: body.pid,
          desc: body.desc,
          status: body.status,
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
      let brands = await this.findById(ctx, models);
      if (!brands) {
        return { code: 0, msg: "该品牌不存在!" };
      }
      let brandsStore = await models.brands.findOne({
        where: { name: body.name, id: { [Op.not]: id } }
      });
      if (brandsStore) {
        return { code: 0, msg: "品牌名称已存在" };
      }

      brands.name = body.name;
      brands.pid = body.pid;
      brands.desc = body.desc;
      brands.status = body.status;
      brands.update_time = Math.floor(Date.now() / 1000);

      await brands.save();
      return brands;
    } catch (error) {
      logUtils.logError(ctx, error);
    }
  },
  async delete(ctx, models) {
    let { logUtils } = ctx;
    try {
      let id = Number(ctx.params.id);
      let brands = await this.findById(ctx, models);
      if (!brands) {
        return null;
      }

      brands.status = false;
      await brands.save();
      return brands;
    } catch (error) {
      logUtils.logError(ctx, error);
    }
  },
  async getTree(ctx, models) {
    let { logUtils } = ctx;
    try {
      let id = Number(ctx.params.id);
      let brands = JSON.stringify(await this.findAll(ctx, models));
      return tree(id, JSON.parse(brands));
    } catch (error) {
      logUtils.logError(ctx, error);
    }
  },
  async findAll(ctx, models) {
    let { logUtils } = ctx;
    try {
      return await models.brands.findAll({
        attributes: this.attributes
      });
    } catch (error) {
      logUtils.logError(ctx, error);
    }
  }
};
