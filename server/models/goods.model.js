exports = module.exports = function(sequelize, DataTypes) {
  const goods = sequelize.define(
    "goods",
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "商品id"
      },
      name: {
        type: DataTypes.STRING(20),
        comment: "商品名称"
      },
      keys: {
        type: DataTypes.STRING(100),
        comment: "检索关键字"
      },
      desc: { type: DataTypes.STRING(100), comment: "商品描述" },
      amount: {
        type: DataTypes.INTEGER(5).UNSIGNED,
        defaultValue: "0",
        comment: "库存数据量"
      },
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
      category_id: {
        type: DataTypes.INTEGER(5).UNSIGNED,
        comment: "商品分类id"
      },
      brand_id: {
        type: DataTypes.INTEGER(5).UNSIGNED,
        comment: "所属品牌id"
      },
      manufacturer_id: {
        type: DataTypes.INTEGER(5).UNSIGNED,
        comment: "供应商id"
      },
      operator: {
        type: DataTypes.INTEGER(5).UNSIGNED,
        comment: "操作人员id"
      }
    },
    {
      sequelize,
      timestamps: false,
      // classLevelMethod: {
      //   associate(models) {
      //     goods.hasMany(models.categories);
      //   }
      // }
    }
  );
  return goods;
};
