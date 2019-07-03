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
    },
    {
      sequelize,
      timestamps: false,
      underscored: true
    }
  );
};
