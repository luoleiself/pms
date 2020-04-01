const Koa = require("Koa");
const Router = require("koa-router");

// const jwt = require("../middleware/jwt");
// console.log(jwt);

const app = new Koa();
const router = new Router();

// const log4js = require("log4js");
// log4js.configure("../config/log4js.json");
// const logger = log4js.getLogger("access");
router.get("/", async (ctx, next) => {
  await next();
  ctx.body = "gg";
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log("service listening in http://localhost:3000...");
});
