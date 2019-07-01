const models = require("../models");

console.log("models", models.Goods);
module.exports = {
  async findAll() {
    return await models.Goods.findAll();
  },
  findById() {
    return models.goods.findOne();
  }
};
