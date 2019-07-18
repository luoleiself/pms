const tree = require("../utils/tree");
exports = module.exports = {
  attributes: ["id", "pid", "name", "desc", "create_time", "update_time", "status"],
  // 查询全部分类分页
  async findAllByPages(ctx, models) {
    let { dbQuery, Op } = ctx;
    return await models.categories.findAndCountAll({
      where: { status: { [Op.in]: dbQuery.status } },
      offset: dbQuery.offset,
      limit: dbQuery.limit,
      attributes: this.attributes
    });
  },
  // 按条件查询全部分类不分页
  async findAllByParams(ctx, models) {
    let { dbQuery, Op } = ctx;
    return await models.categories.findAll({
      where: { status: { [Op.in]: dbQuery.status }, name: { [Op.substring]: dbQuery.keys } },
      attributes: this.attributes
    });
  },
  async findById(ctx, models) {
    let id = Number(ctx.params.id);
    return await models.categories.findOne({
      where: { id: id },
      attributes: this.attributes
    });
  },
  async add(ctx, models) {
    let {
      request: { body }
    } = ctx;
    return await models.categories.findOrCreate({
      where: { name: body.name },
      defaults: {
        pid: body.pid,
        desc: body.desc,
        status: body.status,
        create_time: Math.floor(Date.now() / 1000)
      }
    });
  },
  async update(ctx, models) {
    let {
      request: { body },
      Op
    } = ctx;
    let id = Number(ctx.params.id);
    let categories = await this.findById(ctx, models);
    if (!categories) {
      return { code: 0, msg: "该分类不存在!" };
    }

    let categoriesStore = await models.categories.findOne({
      where: { name: body.name, id: { [Op.not]: id } }
    });
    if (categoriesStore) {
      return { code: 0, msg: "分类名称已存在" };
    }

    categories.name = body.name;
    categories.pid = body.pid;
    categories.desc = body.desc;
    categories.status = body.status;
    categories.update_time = Math.floor(Date.now() / 1000);

    await categories.save();
    return categories;
  },
  async delete(ctx, models) {
    let categories = await this.findById(ctx, models);
    if (!categories) {
      return null;
    }
    categories.status = false;
    await categories.save();
    return categories;
  },
  async getTree(ctx, models) {
    let id = Number(ctx.params.id);
    let categories = JSON.stringify(await this.findAll(ctx, models));
    return tree(id, JSON.parse(categories));
  },
  async findAll(ctx, models) {
    return await models.categories.findAll({
      attributes: this.attributes
    });
  }
};
