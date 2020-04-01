const tree = require("../utils/tree");
exports = module.exports = {
  attributes: [
    "id",
    "pid",
    "name",
    "path",
    "alias",
    "icon",
    "status",
    "create_time",
    "update_time",
    "operator"
  ],
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
    let result = await models.access.findAndCountAll(query);
    result = JSON.parse(JSON.stringify(result));
    for (let i = 0; i < result.rows.length; i++) {
      let res = await models.access.findByPk(result.rows[i].pid);
      result.rows[i]["parent"] = res;
    }
    return result;
  },
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
    return await models.access.findAll(query);
  },
  async findById(ctx, models) {
    let id = Number(ctx.params.id);
    let result = await models.access.findOne({
      where: { id: id },
      attributes: this.attributes
    });
    result = JSON.parse(JSON.stringify(result));
    if (result.pid) {
      result["parent"] = await models.access.findByPk(result.pid);
    }
    return result;
  },
  async add(ctx, models) {
    let {
      request: { body },
      user
    } = ctx;
    return await models.access.findOrCreate({
      where: { path: body.path, alias: body.alias },
      defaults: {
        name: body.name,
        desc: body.desc,
        status: body.status,
        icon: body.icon,
        operator: user.payload.name,
        pid: body.pid,
        create_time: Math.floor(Date.now() / 1000)
      }
    });
  },
  async update(ctx, models) {
    let {
      request: { body },
      user
    } = ctx;
    let id = Number(ctx.params.id);
    let access = await models.access.findOne({ where: { id: id } });
    if (!access) {
      return null;
    }
    access.pid = body.pid;
    access.name = body.name;
    access.path = body.path;
    access.alias = body.alias;
    access.icon = body.icon;
    access.status = body.status;
    access.operator = user ? user.payload.name : "";
    access.update_time = Math.floor(Date.now() / 1000);

    await access.save();
    return access;
  },
  async getTree(ctx, models) {
    let id = Number(ctx.params.id);
    let access = JSON.stringify(await this.findAll(ctx, models));
    return tree(id, JSON.parse(access));
  },
  async findAll(ctx, models) {
    let { dbQuery, Op } = ctx;
    return await models.access.findAll({
      where: { status: { [Op.in]: dbQuery.status } },
      attributes: this.attributes
    });
  }
};
