exports = module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "manufactors",
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "供应商id"
      },
      name: {
        type: DataTypes.STRING(20),
        comment: "供应商名称"
      },
      desc: { type: DataTypes.STRING(100), comment: "供应商描述" },
      address: {
        type: DataTypes.STRING(100),
        comment: "供应商地址"
      },
      contact: {
        type: DataTypes.STRING(20),
        comment: "联系人"
      },
      telephone: {
        type: DataTypes.STRING(15),
        comment: "联系方式"
      },
      fax: {
        type: DataTypes.STRING(15),
        comment: "传真号码"
      },
      email: {
        type: DataTypes.STRING(20),
        comment: "邮箱地址"
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
      operator: {
        type: DataTypes.STRING(20),
        comment: "操作人员"
      }
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
      tableName: "manufactors",
      freezeTableName: true,
      classMethods: {
        associate(models) {
          models.manufactors.hasMany(models.brands, {
            foreignKey: "manufactor_id"
          });
        }
      }
    }
  );
};
