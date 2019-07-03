exports = module.exports = function(sequelize, DataTypes) {
  const categories = sequelize.define(
    "categories",
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "分类id"
      },
      pid: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        defaultValue: "0",
        comment: "父级分类id"
      },
      name: {
        type: DataTypes.STRING(20),
        comment: "分类名称"
      },
      desc: { type: DataTypes.STRING(100), comment: "分类描述" },
      create_time: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        comment: "创建时间"
      },
      update_time: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        comment: "更新时间"
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: "1",
        comment: "启用状态: 1启用，0禁用"
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
  return categories;
};
