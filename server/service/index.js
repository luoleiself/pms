const fs = require("fs");
const path = require("path");
const service = {};

fs.readdirSync(__dirname)
  .filter(fileName => {
    return fileName.indexOf(".") !== 0 && fileName !== "index.js";
  })
  .forEach(fileName => {
    let name = path.basename(fileName, ".js");
    name = name.replace(/\.s/gim, "S");
    service[name] = require(`./${fileName}`);
  });

exports = module.exports = service;
