exports = module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "brands",
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "品牌id"
      },
      pid: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        defaultValue: "0",
        comment: "父级品牌id"
      },
      name: {
        type: DataTypes.STRING(20),
        comment: "品牌名称"
      },
      desc: { type: DataTypes.STRING(100), comment: "品牌描述" },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: "1",
        comment: "启用状态: 1启用，0禁用"
      },
      // manufacturer_id: {
      //   type: DataTypes.INTEGER(5).UNSIGNED,
      //   comment: "供应商id"
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
      tableName: "brands",
      freezeTableName: true,
      classMethods: {
        associate(models) {
          models.brands.hasMany(models.goods, {
            foreignKey: "brand_id"
          });
        }
      }
    }
  );
};
