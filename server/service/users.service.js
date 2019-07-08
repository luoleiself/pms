exports = module.exports = {
  async findByPages(models, ctx) {
    let { logUtils, dbQuery } = ctx;
    try {
      return await models.users.findAndCountAll({
        offset: dbQuery.offset,
        limit: dbQuery.limit
      });
    } catch (error) {
      logUtils.logError(ctx, error);
    }
  },
  async findById({ users }, ctx) {
    let { logUtils } = ctx;
    try {
      let id = Number.parseInt(ctx.params.id);
      return await users.findOne({ where: { id: id } });
    } catch (error) {
      logUtils.logError(ctx, error);
    }
  },
  async add({ users }, ctx) {
    let {
      logUtils,
      request: { body }
    } = ctx;
    try {
      return await users.findOrCreate({
        where: { name: ctx.request.body.name },
        defaults: {
          sex: body.sex,
          department: body.department,
          password: body.password,
          telephone: body.telephone,
          address: body.address,
          create_time: Date.now() / 1000
        }
      });
    } catch (error) {
      logUtils.logError(ctx, error);
    }
  },
  async update({ users }, ctx) {
    let { logUtils } = ctx;
    try {
      let result = await users.update({});
    } catch (error) {
      logUtils.logError(ctx, error);
    }
  },
  async delete({ users }, ctx) {
    let { logUtils } = ctx;
    try {
      let result = await users.delete();
    } catch (error) {
      logUtils.logError(ctx, error);
    }
  }
};
