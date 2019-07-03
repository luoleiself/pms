const path = require("path");
const fs = require("fs");
const Sequelize = require("sequelize");
const config = require(path.resolve(__dirname, "..", "config/db.config.json"));

let db = {};
let sequelize = null;

try {
  sequelize = new Sequelize(
    config.dev.database,
    config.dev.username,
    config.dev.password,
    {
      host: config.dev.host,
      dialect: config.dev.dialect,
      pool: config.dev.pool
    }
  );
  sequelize.authenticate();
} catch (error) {
  throw new Error(error);
}

fs.readdirSync(__dirname)
  .filter(function(file) {
    return file.indexOf(".") !== 0 && file !== "index.js";
  })
  .forEach(function(file) {
    let model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.categories.hasMany(db.goods); // categories    1:N    goods

db.brands.hasMany(db.goods); // brands    1:N    goods

db.manufactors.hasMany(db.brands); // manufactors    1:N    brands

db.manufactors.hasMany(db.goods); // manufactors    1:N   goods

db.goods.hasMany(db.sales); // goods    1:N   sales

db.goods.hasMany(db.purchase); // goods   1:N   purchase

db.users.belongsToMany(db.roles, {
  through: db.user_role
}); // users    M:N   roles
db.roles.belongsToMany(db.users, {
  through: db.user_role
}); // roles    M:N   users

db.roles.belongsToMany(db.func, {
  through: db.role_func
}); // roles    M:N   func
db.func.belongsToMany(db.roles, {
  through: db.role_func
}); // func    M:N   roles

exports = module.exports = db;
