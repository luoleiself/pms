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

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

exports = module.exports = db;
