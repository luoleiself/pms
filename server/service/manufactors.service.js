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
    let { logUtils, dbQuery } = ctx;
    try {
      return await models.manufactors.findAndCountAll({
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
      return await models.manufactors.findOne({
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
    } catch (error) {
      logUtils.logError(ctx, error);
    }
  },
  async delete(ctx, models) {
    let { logUtils } = ctx;
    try {
      let manufactors = await this.findById(ctx, models);
      if (!manufactors) {
        return null;
      }
      manufactors.status = false;
      await manufactors.save();
      return manufactors;
    } catch (error) {
      logUtils.logError(ctx, error);
    }
  }
};
