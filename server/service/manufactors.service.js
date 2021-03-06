const tree = require("../utils/tree");
exports = module.exports = {
  attributes: [
    "id",
    "name",
    "desc",
    "address",
    "contact",
    "telephone",
    "fax",
    "email",
    "create_time",
    "update_time",
    "status",
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
    return await models.manufactors.findAndCountAll(query);
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
    return await models.manufactors.findAll(query);
  },
  async findById(ctx, models) {
    let id = Number(ctx.params.id);
    return await models.manufactors.findOne({
      where: { id: id },
      attributes: this.attributes
    });
  },
  async add(ctx, models) {
    let {
      request: { body },
      user
    } = ctx;
    return await models.manufactors.findOrCreate({
      where: { name: body.name },
      defaults: {
        desc: body.desc,
        address: body.address,
        contact: body.contact,
        telephone: body.telephone,
        fax: body.fax,
        email: body.email,
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
    let manufactors = await this.findById(ctx, models);
    if (!manufactors) {
      return null;
    }

    manufactors.name = body.name;
    manufactors.desc = body.desc;
    manufactors.address = body.address;
    manufactors.contact = body.contact;
    manufactors.telephone = body.telephone;
    manufactors.fax = body.fax;
    manufactors.email = body.email;
    manufactors.status = body.status;
    manufactors.operator = user.payload.name;
    manufactors.update_time = Math.floor(Date.now() / 1000);

    await manufactors.save();
    return manufactors;
  },
  async delete(ctx, models) {
    let manufactors = await this.findById(ctx, models);
    if (!manufactors) {
      return null;
    }
    manufactors.status = false;
    await manufactors.save();
    return manufactors;
  }
};
