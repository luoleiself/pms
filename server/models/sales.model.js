exports = module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "sales",
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "销售记录id"
      },
      price: {
        type: DataTypes.DECIMAL(10, 2).UNSIGNED,
        defaultValue: "0.0",
        comment: "销售单价"
      },
      amount: {
        type: DataTypes.SMALLINT(5).UNSIGNED,
        defaultValue: "0",
        comment: "销售数量"
      },
      // goods_id: {
      //   type: DataTypes.INTEGER(5).UNSIGNED,
      //   comment: "商品id"
      // },
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
      underscored: true,
      tableName: "sales",
      freezeTableName: true
      // classMethods: {
      //   associate(models) {
      //   }
      // }
    }
  );
};
