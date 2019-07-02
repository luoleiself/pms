exports = module.exports = function({ goods }) {
  return {
    async findAll() {
      return await goods.findAll();
    },
    async findOne() {
      return goods.findOne();
    }
  };
};
