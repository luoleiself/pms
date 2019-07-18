exports = module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "access",
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "菜单id"
      },
      pid: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        defaultValue: "0",
        comment: "菜单父id"
      },
      name: {
        type: DataTypes.STRING(20),
        comment: "菜单名称"
      },
      url: {
        type: DataTypes.STRING(20),
        comment: "菜单连接"
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
      tableName: "access",
      freezeTableName: true,
      classMethods: {
        associate(models) {
          models.access.belongsToMany(models.roles, {
            through: models.role_access,
            foreignKey: "access_id"
          });
        }
      }
    }
  );
};
