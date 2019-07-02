const models = require("../models");
const goodsService = require("./goods.service")(models);

exports = module.exports = {
  goodsService
};
