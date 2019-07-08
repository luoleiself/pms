exports = module.exports = {
  async findByPages(models, ctx) {
    let { logUtils, dbQuery } = ctx;
    try {
      return await models.users.findAndCountAll({
        offset: dbQuery.offset,
        limit: dbQuery.limit
      });
    } catch (error) {
      logUtils.logError(ctx, error);
    }
  },
  async findById({ users }, ctx) {
    let { logUtils } = ctx;
    try {
      let id = Number.parseInt(ctx.params.id);
      return await users.findOne({ where: { id: id } });
    } catch (error) {
      logUtils.logError(ctx, error);
    }
  },
  async add(models, ctx) {
    let {
      logUtils,
      request: { body }
    } = ctx;
    try {
      return await models.users.findOrCreate({
        where: { username: body.username },
        defaults: {
          name: body.name,
          role_type: body.role_type,
          sex: body.sex,
          department: body.department,
          password: body.password,
          telephone: body.telephone,
          address: body.address,
          create_time: Math.floor(Date.now() / 1000)
        }
      });
    } catch (error) {
      logUtils.logError(ctx, error);
    }
  },
  async update(models, ctx) {
    let {
      logUtils,
      request: { body }
    } = ctx;
    try {
      let user = await this.findById(models, ctx);
      if (!user) {
        return null;
      }
      user.name = body.name;
      user.sex = body.sex;
      user.name = body.name;
      user.role_type = body.role_type;
      user.sex = body.sex;
      user.department = body.department;
      user.password = body.password;
      user.telephone = body.telephone;
      user.address = body.address;
      user.update_time = Math.floor(Date.now() / 1000);
      user.status = body.status;
      
      await user.save();
      return user;
    } catch (error) {
      logUtils.logError(ctx, error);
    }
  },
  async delete({ users }, ctx) {
    let { logUtils } = ctx;
    try {
      let result = await users.delete();
    } catch (error) {
      logUtils.logError(ctx, error);
    }
  }
};
