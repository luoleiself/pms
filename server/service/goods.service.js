exports = module.exports = {
  async findAll({ goods }, ctx) {
    return await goods.findAll();
  },
  async findOne({ goods }, ctx) {
    return await goods.findOne();
  }
};
