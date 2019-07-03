exports = module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "purchase",
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "采购记录id"
      },
      price: {
        type: DataTypes.DECIMAL(10, 2).UNSIGNED,
        defaultValue: "0.0",
        comment: "采购单价"
      },
      amount: {
        type: DataTypes.INTEGER(5).UNSIGNED,
        defaultValue: "0",
        comment: "采购数量"
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
