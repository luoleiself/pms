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
    "status"
  ],
  async findByPages(ctx, models) {
    let { dbQuery } = ctx;
    return await models.manufactors.findAndCountAll({
      offset: dbQuery.offset,
      limit: dbQuery.limit,
      attributes: this.attributes
    });
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
      request: { body }
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
    let manufactors = await this.findById(ctx, models);
    if (!manufactors) {
      return { code: 0, msg: "该供应商不存在!" };
    }

    let manufactorsStore = await models.manufactors.findOne({
      where: { name: body.name, id: { [Op.not]: id } }
    });
    if (manufactorsStore) {
      return { code: 0, msg: "供应商名称已存在" };
    }

    manufactors.name = body.name;
    manufactors.desc = body.desc;
    manufactors.address = body.address;
    manufactors.contact = body.contact;
    manufactors.telephone = body.telephone;
    manufactors.fax = body.fax;
    manufactors.email = body.email;
    manufactors.status = body.status;
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
