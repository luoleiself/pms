const tree = require("../utils/tree");
exports = module.exports = {
  async login(ctx, models) {
    let {
      request: { body }
    } = ctx;
    let result = await models.users.findOne({
      where: { username: body.username },
      attributes: [
        "id",
        "name",
        "username",
        "password",
        "sex",
        "department",
        "telephone",
        "address",
        "status",
        "create_time",
        "update_time"
      ],
      include: { model: models.roles, include: { model: models.access } }
    });
    if (!result) {
      return { code: 404 };
    }
    if (result.password != body.password) {
      return { code: 400 };
    }
    if (!result.status) {
      return { code: 401 };
    }

    let res = result.roles.reduce(
      (cur, val) => cur.concat(val.accesses.reduce((cur, val) => cur.concat(val), [])),
      []
    );

    let arr = [];
    res.forEach(item => {
      arr.findIndex(val => val.id == item.id) == -1 && arr.push(item);
    });
    
    result = JSON.parse(JSON.stringify(result));
    result.menu = arr;
    return result;
  }
};
