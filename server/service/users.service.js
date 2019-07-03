exports = module.exports = {
  async findAll({ users }, ctx) {
    let { logUtils } = ctx;
    try {
      return await users.findAll();
    } catch (error) {
      logUtils.logError(ctx, error);
    }
  },
  async findOne({ users }, ctx) {
    return await users.findOne();
  }
};
