const tree = require("../utils/tree");
exports = module.exports = {
  attributes: [
    "id",
    "pid",
    "name",
    "desc",
    "create_time",
    "update_time",
    "status",
    "operator",
    "manufactor_id"
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
      include: [{ model: models.manufactors }]
    };
    if (dbQuery.keys) {
      query.where.name = { [Op.substring]: dbQuery.keys };
    }
    if (dbQuery.manufactor_id) {
      query.where.manufactor_id = dbQuery.manufactor_id;
    }
    let result = await models.brands.findAndCountAll(query);
    result = JSON.parse(JSON.stringify(result));
    for (let i = 0; i < result.rows.length; i++) {
      if (result.rows[i].pid) {
        let res = await models.brands.findByPk(result.rows[i].pid);
        result.rows[i]["pname"] = res.name;
      } else {
        result.rows[i]["pname"] = "";
      }
    }
    return result;
  },
  // 按条件查询全部不分页
  async findAllByParams(ctx, models) {
    let { dbQuery, Op } = ctx;
    let query = {
      where: {
        status: { [Op.in]: dbQuery.status }
      },
      order: [dbQuery.orderBy.split(",")],
      attributes: this.attributes,
      include: [models.manufactors]
    };
    if (dbQuery.keys) {
      query.where.name = { [Op.substring]: dbQuery.keys };
    }
    if (dbQuery.manufactor_id) {
      query.where.manufactor_id = dbQuery.manufactor_id;
    }
    return await models.brands.findAll(query);
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
      request: { body },
      user
    } = ctx;
    return await models.brands.findOrCreate({
      where: { name: body.name },
      defaults: {
        pid: body.pid,
        desc: body.desc,
        status: body.status,
        operator: user ? user.payload.name : "",
        manufactor_id: body.manufactor_id,
        create_time: Math.floor(Date.now() / 1000)
      }
    });
  },
  async update(ctx, models) {
    let {
      request: { body },
      user
    } = ctx;
    let brands = await this.findById(ctx, models);
    if (!brands) {
      return { code: 0, msg: "该品牌不存在!" };
    }

    brands.name = body.name;
    brands.pid = body.pid;
    brands.desc = body.desc;
    brands.status = body.status;
    brands.operator = user ? user.payload.name : "";
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
