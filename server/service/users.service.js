exports = module.exports = {
  attributes: [
    "id",
    "name",
    "username",
    "password",
    "sex",
    "department",
    "address",
    "telephone",
    "status",
    "create_time",
    "update_time",
    "operator"
  ],
  async findAllByPages(ctx, models) {
    let { dbQuery, Op } = ctx;
    let query = {
      where: { status: { [Op.in]: dbQuery.status } },
      order: [dbQuery.orderBy.split(",")],
      offset: dbQuery.offset,
      limit: dbQuery.limit,
      attributes: this.attributes,
      include: [{ model: models.roles, through: { model: models.user_role } }]
    };
    if (dbQuery.keys) {
      query.where.name = { [Op.substring]: dbQuery.keys };
    }
    return await models.users.findAndCountAll(query);
  },
  async findAllByParams(ctx, models) {
    let { dbQuery, Op } = ctx;
    return await models.users.findAll({
      where: { status: { [Op.in]: dbQuery.status }, name: { [Op.substring]: dbQuery.keys } },
      attributes: this.attributes
    });
  },
  async findById(ctx, models) {
    let id = Number(ctx.params.id);
    return await models.users.findOne({
      where: { id: id },
      attributes: this.attributes
    });
  },
  async add(ctx, models) {
    let {
      request: { body },
      Op,
      user
    } = ctx;

    let users = await models.users.findOne({ where: { username: body.username } });
    if (users) {
      return { code: 403, msg: "该登陆用户名已存在!" };
    }
    let roles = await models.roles.findAll({ where: { id: { [Op.in]: body.role_id } } });
    console.log(JSON.stringify(roles));
    return models.sequelize
      .transaction(t => {
        let users = await models.users.create(
          {
            username: body.username,
            name: body.name,
            password: body.password,
            sex: Number(body.sex),
            department: body.department,
            telephone: body.telephone,
            address: body.address,
            operator: user.payload.name,
            create_time: Math.floor(Date.now() / 1000)
          },
          { transaction: t }
        );
        users.setRoles(roles, { transaction: t });
      })
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        throw new Error(err);
      });
  },
  async update(ctx, models) {
    let {
      request: { body },
      user
    } = ctx;
    let users = await this.findById(ctx, models);
    if (!users) {
      return { code: 0, msg: "该用户不存在!" };
    }
    users.name = body.name;
    users.username = body.username;
    users.password = body.password;
    users.sex = body.sex;
    users.department = body.department;
    users.telephone = body.telephone;
    users.address = body.address;
    users.status = body.status;
    users.operator = user.payload.name;
    users.update_time = Math.floor(Date.now() / 1000);

    await users.save();
    return users;
  },
  async delete(ctx, models) {
    let user = await this.findById(ctx, models);
    if (!user) {
      return null;
    }

    user.status = false;
    await user.save();
    return user;
  }
};
