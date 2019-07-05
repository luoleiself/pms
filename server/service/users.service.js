exports = module.exports = {
  async findByPages({ users }, ctx) {
    let { logUtils } = ctx;
    let p = ctx.query.p || 1;
    let p_size = ctx.query.p_size || 10;
    try {
      let limit = Number(p_size);
      let offset = Number(p - 1) * p_size;
      return await users.findAndCountAll({ offset, limit });
    } catch (error) {
      logUtils.logError(ctx, error);
    }
  },
  async findById({ users }, ctx) {
    let { logUtils } = ctx;
    try {
      let id = Number.parseInt(ctx.params.id);
      if (id) {
        console.log(id);
        return await users.findOne({ where: { id: id } });
      } else {
        throw new Error(id);
      }
    } catch (error) {
      logUtils.logError(ctx, error);
    }
  }
};
