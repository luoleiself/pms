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
  console.error(`数据库连接出错，请检查models\\index.js`);
  process.exit();
}

fs.readdirSync(__dirname)
  .filter(fileName => {
    return fileName.indexOf(".") !== 0 && fileName !== "index.js";
  })
  .forEach(fileName => {
    let model = sequelize.import(path.join(__dirname, fileName));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (
    db[modelName].options.hasOwnProperty("classMethods") &&
    db[modelName].options.classMethods.hasOwnProperty("associate")
  ) {
    db[modelName].options.classMethods.associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// db.categories.hasMany(db.goods); // categories    1:N    goods

// db.brands.hasMany(db.goods); // brands    1:N    goods

// db.manufactors.hasMany(db.brands); // manufactors    1:N    brands

// db.manufactors.hasMany(db.goods); // manufactors    1:N   goods

// db.goods.hasMany(db.sales); // goods    1:N   sales

// db.goods.hasMany(db.purchase); // goods   1:N   purchase

// db.users.belongsToMany(db.roles, {
//   through: db.user_role,
//   foreignKey: "user_id"
// });

// db.roles.belongsToMany(db.users, {
//   through: db.user_role,
//   foreignKey: "role_id"
// });

exports = module.exports = db;
