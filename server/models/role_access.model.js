exports = module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "role_access",
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "角色菜单id"
      }
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
      tableName: "role_access",
      freezeTableName: true
      // classMethods: {
      //   associate(models) {}
      // }
    }
  );
};
