exports = module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "role_func",
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "角色功能id"
      }
    },
    {
      sequelize,
      timestamps: false,
      underscored: true
    }
  );
};
