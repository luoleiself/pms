exports = module.exports = {
  attributes: ["id", "name", "desc", "status", "create_time", "update_time", "operator"],
  async findAllByPages(ctx, models) {
    let { dbQuery, Op } = ctx;
    let query = {
      where: { status: { [Op.in]: dbQuery.status } },
      order: [dbQuery.orderBy.split(",")],
      offset: dbQuery.offset,
      limit: dbQuery.limit,
      attributes: this.attributes
    };
    if (dbQuery.keys) {
      query.where.name = { [Op.substring]: dbQuery.keys };
    }
    return await models.roles.findAndCountAll(query);
  },
  async findAllByParams(ctx, models) {
    let { dbQuery, Op } = ctx;
    let query = {
      where: { status: { [Op.in]: dbQuery.status } },
      order: [dbQuery.orderBy.split(",")],
      attributes: this.attributes
    };
    if (dbQuery.keys) {
      query.where.name = { [Op.substring]: dbQuery.keys };
    }
    return await models.roles.findAll(query);
  },
  async findById(ctx, models) {
    let id = Number(ctx.params.id);
    return await models.roles.findOne({
      where: { id: id },
      attributes: this.attributes,
      include: [{ model: models.access, through: { model: models.role_access } }]
    });
  },
  async add(ctx, models) {
    let {
      request: { body },
      user
    } = ctx;
    return await models.roles.findOrCreate({
      where: { name: body.name },
      defaults: {
        desc: body.desc,
        status: body.status == 1 ? true : false,
        operator: user.payload.name,
        create_time: Math.floor(Date.now() / 1000)
      }
    });
  },
  async update(ctx, models) {
    let {
      request: { body },
      Op,
      user
    } = ctx;
    let roles = await this.findById(ctx, models);
    if (!roles) {
      return null;
    }

    let access = null;
    if (body.access_id) {
      access = await models.access.findAll({ where: { id: { [Op.in]: body.access_id } } });
    }

    return models.sequelize
      .transaction(async t => {
        roles.name = body.name;
        roles.desc = body.desc;
        if(body.status != undefined){
          roles.status = body.status == "1" ? true : false;
        }
        roles.operator = user.payload.name;
        roles.update_time = Math.floor(Date.now() / 1000);

        await roles.save();
        if (body.access_id) {
          await roles.setAccesses(access, { transaction: t });
        }
        return roles;
      })
      .then(async res => {
        return await this.findById(ctx, models);
      })
      .catch(err => {
        console.log(err);
        throw new Error(err);
      });
  }
};
