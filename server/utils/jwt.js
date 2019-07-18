const jwt = require("jsonwebtoken");

const CERT = "hello pms";
const OPTIONS = {
  expiresIn: 86400,
  audience: "pms",
  issuer: "luoleiself",
  subject: "jwt"
};

exports = module.exports = {
  sign(params) {
    try {
      return jwt.sign(params, CERT, OPTIONS);
    } catch (error) {
      console.log("token生成失败!");
      throw new Error(error);
    }
  },
  verify(token) {
    let flag = true;
    try {
      jwt.verify(token, CERT);
    } catch (error) {
      flag = false;
      console.log("token验证失败!");
    }
    return flag;
  },
  decode(token) {
    return jwt.decode(token, { complete: true });
  }
};
