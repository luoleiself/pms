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
    return result;
  }
};
