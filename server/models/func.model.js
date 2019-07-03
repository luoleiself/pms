exports = module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "func",
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "功能id"
      },
      pid: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        defaultValue: "0",
        comment: "功能父id"
      },
      name: {
        type: DataTypes.STRING(20),
        comment: "权限名称"
      },
      url: {
        type: DataTypes.STRING(50),
        comment: "功能url"
      },
      desc: {
        type: DataTypes.STRING(100),
        comment: "功能描述"
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
