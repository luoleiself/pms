exports = module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "Goods",
    {
      name: DataTypes.STRING, 
      userName: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      phoneNum: DataTypes.STRING,
      salt: DataTypes.STRING,
      comments: DataTypes.STRING,
      photo: { type: DataTypes.STRING, default: "" },
      auth: { type: DataTypes.BOOLEAN, default: "" }
    }
    // {
    //   classMethods: {
    //     associate: function(models) {
    //       // Using additional options like CASCADE etc for demonstration
    //       // Can also simply do Task.belongsTo(models.User);
    //       AdminUser.belongsTo(models.AdminGroup);
    //     }
    //   }
    // }
  );
};
