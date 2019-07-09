const path = require("path");
const fs = require("fs");
const Sequelize = require("sequelize");
const config = require(path.resolve(__dirname, "..", "config/db.config.json"));

let db = {};
let sequelize = null;

try {
  sequelize = new Sequelize(config.dev.database, config.dev.username, config.dev.password, {
    host: config.dev.host,
    dialect: config.dev.dialect,
    pool: config.dev.pool
  });
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

exports = module.exports = db;
