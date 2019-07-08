exports = module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "user_role",
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "用户角色id"
      }
      // user_id: {
      //   type: DataTypes.INTEGER(10).UNSIGNED,
      //   allowNull: false,
      //   comment: "用户id"
      // },
      // role_id: {
      //   type: DataTypes.INTEGER(10).UNSIGNED,
      //   allowNull: false,
      //   comment: "角色id"
      // }
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
      tableName: "user_role",
      freezeTableName: true
      // classMethods: {
      //   associate(models) {
      //     models.roles.hasMany(models.users, {
      //       through: models.user_role,
      //       foreignKey: "role_id"
      //     });
      //   }
      // }
    }
  );
};
