const Koa = require("koa");
const md5 = require("md5");
const models = require("./models");
const router = require("./controller");
const logUtils = require("./utils/logUtils");

const app = new Koa();

app.use(async (ctx, next) => {
  ctx.logUtils = logUtils;
  ctx.resData = {
    code: 10200,
    msg: "操作成功",
    data: []
  };
  let startTime = Date.now();
  await next();
  let endTime = Date.now();
  ctx.set({
    "Cache-Control": "no-cache",
    "X-Response-Time": `${endTime - startTime}ms`
  });
  logUtils.logAccess(ctx);
});

app.use(router.routes()).use(router.allowedMethods());

/* 数据库同步 */
models.sequelize
  .sync()
  .then(async () => {
    console.log("|----- database sync success -----|");

    let user = null;
    try {
      user = await models.users.findOne({ where: { name: "admin" } });
      if (!user) {
        models.users
          .build({
            name: "admin",
            password: md5(123456),
            department: "系统部",
            telephone: "010-12345678",
            address: "北京市朝阳区朝阳路1号",
            create_time: Date.now() / 1000
          })
          .save();
      }
    } catch (error) {
      throw new Error(error);
    }

    app.listen(3000, () => {
      console.log("pms service is running at http://localhost:3000");
    });
  })
  .catch(err => {
    throw new Error(err);
  });
