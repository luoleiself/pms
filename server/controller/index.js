const fs = require("fs");
const path = require("path");
const Router = require("koa-router");

const router = new Router();
router.prefix("/api");

fs.readdirSync(__dirname)
  .filter(fileName => {
    return fileName.indexOf(".") !== 0 && fileName !== "index.js";
  })
  .forEach(fileName => {
    router.use(
      `/${path.basename(fileName, ".controller.js")}`,
      require(`./${fileName}`).routes()
    );
  });

router.all("/", async (ctx, next) => {
  await next();
  ctx.body = { code: 10404, msg: "Not matched to any routing" };
});

exports = module.exports = router;
