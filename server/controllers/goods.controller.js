const Router = require("koa-router");
const goods = new Router();

goods.get("/:id", (ctx, next) => {
  next();
});

exports = module.exports = goods;
