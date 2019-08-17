exports = module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "purchase",
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "入库记录id"
      },
      /* price: {
        type: DataTypes.DECIMAL(10, 2).UNSIGNED,
        defaultValue: "0.00",
        comment: "入库单价"
      }, */
      amount: {
        type: DataTypes.SMALLINT(5).UNSIGNED,
        defaultValue: "0",
        comment: "入库数量"
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
        type: DataTypes.STRING(20),
        comment: "操作人员"
      }
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
      tableName: "purchase",
      freezeTableName: true,
      classMethods: {
        associate(models) {
          models.purchase.belongsTo(models.goods, {
            foreignKey: "goods_id"
          });
        }
      }
    }
  );
};
