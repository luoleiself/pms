exports = module.exports = {
  attributes: [
    "id",
    "name",
    "username",
    "sex",
    "department",
    "address",
    "telephone",
    "status",
    "create_time",
    "update_time"
  ],
  async findByPages(ctx, models) {
    let { logUtils, dbQuery } = ctx;
    try {
      return await models.users.findAndCountAll({
        attributes: this.attributes,
        offset: dbQuery.offset,
        limit: dbQuery.limit
      });
    } catch (error) {
      logUtils.logError(ctx, error);
    }
  },
  async findById(ctx, models) {
    let { logUtils } = ctx;
    try {
      let id = Number(ctx.params.id);
      return await models.users.findOne({
        where: { id: id },
        attributes: this.attributes
      });
    } catch (error) {
      logUtils.logError(ctx, error);
    }
  },
  async add(ctx, models) {
    let {
      logUtils,
      request: { body }
    } = ctx;
    try {
      return await models.users.findOrCreate({
        where: { username: body.username },
        defaults: {
          name: body.name,
          username: body.username,
          password: body.password,
          sex: body.sex,
          department: body.department,
          telephone: body.telephone,
          address: body.address,
          create_time: Math.floor(Date.now() / 1000)
        }
      });
    } catch (error) {
      logUtils.logError(ctx, error);
    }
  },
  async update(ctx, models) {
    let {
      logUtils,
      request: { body }
    } = ctx;
    try {
      let user = await this.findById(ctx, models);
      if (!user) {
        return null;
      }
      user.name = body.name;
      // user.password = body.password;
      user.sex = body.sex;
      user.department = body.department;
      user.telephone = body.telephone;
      user.address = body.address;
      user.update_time = Math.floor(Date.now() / 1000);

      await user.save();
      return user;
    } catch (error) {
      logUtils.logError(ctx, error);
    }
  },
  async delete(ctx, models) {
    let { logUtils } = ctx;
    try {
      let user = await this.findById(ctx, models);
      if (!user) {
        return null;
      }
      
      user.status = false;
      await user.save();
      return user;
    } catch (error) {
      logUtils.logError(ctx, error);
    }
  }
};
