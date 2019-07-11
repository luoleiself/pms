const tree = require("../utils/tree");
exports = module.exports = {
  attributes: ["id", "pid", "name", "desc", "create_time", "update_time", "status"],
  async findByPages(ctx, models) {
    let { dbQuery } = ctx;
    const Op = models.Sequelize.Op;
    return await models.brands.findAndCountAll({
      where: { status: { [Op.in]: dbQuery.status } },
      offset: dbQuery.offset,
      limit: dbQuery.limit,
      attributes: this.attributes,
      include: [models.manufactors]
    });
  },
  async findById(ctx, models) {
    let id = Number(ctx.params.id);
    return await models.brands.findOne({
      where: { id: id },
      attributes: this.attributes,
      include: [models.manufactors]
    });
  },
  async add(ctx, models) {
    let {
      request: { body }
    } = ctx;
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
  },
  async update(ctx, models) {
    let {
      request: { body }
    } = ctx;
    const Op = models.Sequelize.Op;
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
  },
  async delete(ctx, models) {
    let brands = await this.findById(ctx, models);
    if (!brands) {
      return null;
    }

    brands.status = false;
    await brands.save();
    return brands;
  },
  async getTree(ctx, models) {
    let id = Number(ctx.params.id);
    let brands = JSON.stringify(await this.findAll(ctx, models));
    return tree(id, JSON.parse(brands));
  },
  async findAll(ctx, models) {
    return await models.brands.findAll({
      attributes: this.attributes
    });
  }
};
