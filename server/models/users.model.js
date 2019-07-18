exports = module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "用户id"
      },
      name: {
        type: DataTypes.STRING(20),
        comment: "用户姓名"
      },
      username: {
        type: DataTypes.STRING(20),
        comment: "登陆用户名"
      },
      password: {
        type: DataTypes.STRING(200),
        comment: "用户密码"
      },
      sex: {
        type: DataTypes.TINYINT(1),
        defaultValue: "1",
        comment: "性别: 1男, 0女"
      },
      department: {
        type: DataTypes.STRING(15),
        comment: "所属部门"
      },
      telephone: {
        type: DataTypes.STRING(15),
        comment: "联系电话"
      },
      address: {
        type: DataTypes.STRING(100),
        comment: "地址"
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: "1",
        comment: "启用状态: 1启用，0禁用"
      },
      create_time: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        comment: "创建时间"
      },
      update_time: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        comment: "更新时间"
      },
      operator: {
        type: DataTypes.STRING(20),
        comment: "操作人员"
      }
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
      tableName: "users",
      freezeTableName: true,
      classMethods: {
        associate(models) {
          models.users.belongsToMany(models.roles, {
            through: models.user_role,
            foreignKey: "user_id"
          });
        }
      }
    }
  );
};
