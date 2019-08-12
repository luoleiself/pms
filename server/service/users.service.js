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
      order: [dbQuery.orderBy.split(",")],
      attributes: this.attributes,
      include: [{ model: models.roles, through: { model: models.user_role } }]
    });
  },
  async findById(ctx, models) {
    let id = Number(ctx.params.id);
    return await models.users.findOne({
      where: { id: id },
      attributes: this.attributes,
      include: [{ model: models.roles, through: { model: models.user_role } }]
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
    return models.sequelize
      .transaction(t => {
        return models.users
          .create(
            {
              username: body.username,
              name: body.name,
              password: body.password,
              sex: Number(body.sex),
              department: body.department,
              telephone: body.telephone,
              address: body.address,
              operator: user ? user.payload.name : "",
              create_time: Math.floor(Date.now() / 1000)
            },
            { transaction: t }
          )
          .then(async users => {
            await users.setRoles(roles, { transaction: t });
            return users;
          });
      })
      .then(users => {
        return users;
      })
      .catch(err => {
        console.log(err);
        throw new Error(err);
      });
  },
  async update(ctx, models) {
    let {
      request: { body },
      Op,
      user
    } = ctx;
    let users = await this.findById(ctx, models);
    if (!users) {
      return { code: 404, msg: "该用户不存在!" };
    }

    let roles = null;
    if (body.role_id) {
      roles = await models.roles.findAll({ where: { id: { [Op.in]: body.role_id } } });
    }
    return models.sequelize
      .transaction(async t => {
        users.name = body.name;
        users.username = body.username;
        users.password = body.password;
        users.sex = body.sex;
        users.department = body.department;
        users.telephone = body.telephone;
        users.address = body.address;
        users.status = body.status;
        users.operator = user ? user.payload.name : "";
        users.update_time = Math.floor(Date.now() / 1000);

        await users.save();
        if (body.role_id) {
          await users.setRoles(roles, { transaction: t });
        }
        return users;
      })
      .then(async res => {
        return await this.findById(ctx, models);
      })
      .catch(err => {
        console.log(err);
        throw new Error(err);
      });
  },
  async delete(ctx, models) {
    let user = await this.findById(ctx, models);
    if (!user) {
      return null;
    }

    user.status = false;
    await user.save();
    return user;
  },
  // 登陆
  async login(ctx, models) {
    let {
      request: { body }
    } = ctx;
    let result = await models.users.findOne({
      where: { username: body.username },
      attributes: this.attributes,
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
