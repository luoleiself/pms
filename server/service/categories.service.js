const tree = require("../utils/tree");
exports = module.exports = {
  attributes: ["id", "pid", "name", "desc", "create_time", "update_time", "status", "operator"],
  // 查询全部分类分页
  async findAllByPages(ctx, models) {
    let { dbQuery, Op } = ctx;
    let query = {
      where: { status: { [Op.in]: dbQuery.status } },
      order: [dbQuery.orderBy.split(",")],
      offset: dbQuery.offset,
      limit: dbQuery.limit,
      attributes: this.attributes
    };
    if (dbQuery.keys) {
      query.where.name = { [Op.substring]: dbQuery.keys };
    }
    let result = await models.categories.findAndCountAll(query);
    result = JSON.parse(JSON.stringify(result));
    for (let i = 0; i < result.rows.length; i++) {
      if (result.rows[i].pid) {
        let res = await models.categories.findByPk(result.rows[i].pid);
        result.rows[i]["pname"] = res.name;
      } else {
        result.rows[i]["pname"] = "";
      }
    }
    return result;
  },
  // 按条件查询全部分类不分页
  async findAllByParams(ctx, models) {
    let { dbQuery, Op } = ctx;
    let query = {
      where: { status: { [Op.in]: dbQuery.status } },
      order: [dbQuery.orderBy.split(",")],
      attributes: this.attributes
    };
    if (dbQuery.keys) {
      query.where.name = { [Op.substring]: dbQuery.keys };
    }
    return await models.categories.findAll(query);
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
      request: { body },
      user
    } = ctx;
    return await models.categories.findOrCreate({
      where: { name: body.name },
      defaults: {
        pid: body.pid,
        desc: body.desc,
        status: body.status,
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
    let categories = await this.findById(ctx, models);
    if (!categories) {
      return null;
    }

    categories.name = body.name;
    categories.pid = body.pid;
    categories.desc = body.desc;
    categories.status = body.status;
    categories.operator = user.payload.name;
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
