exports = module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "roles",
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "角色id"
      },
      name: {
        type: DataTypes.STRING(20),
        comment: "角色名称"
      },
      desc: {
        type: DataTypes.STRING(100),
        comment: "角色描述"
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
      underscored: true,
      tableName: "roles",
      freezeTableName: true,
      classMethods: {
        associate(models) {
          models.roles.belongsToMany(models.users, {
            through: models.user_role,
            foreignKey: "role_id"
          });
          models.roles.belongsToMany(models.access, {
            through: models.role_access,
            foreignKey: "role_id"
          });
        }
      }
    }
  );
};
