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
        comment: "用户名称"
      },
      sex: {
        type: DataTypes.BOOLEAN,
        defaultValue: "1",
        comment: "性别: 1男, 0女"
      },
      department: {
        type: DataTypes.STRING(15),
        comment: "所属部门"
      },
      password: {
        type: DataTypes.STRING(200),
        comment: "用户密码"
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
        type: DataTypes.INTEGER(5).UNSIGNED,
        comment: "操作人员id"
      }
    },
    {
      sequelize,
      timestamps: false,
      underscored: true
    }
  );
};
