const CERT = "hello pms";
const OPTIONS = {
  algorithm: "RS256",
  expiresIn: 60 * 60,
  people: "pms",
  issuer: "luoleiself",
  subject: "jwt"
};

const jwt = require("jsonwebtoken");

exports = module.exports = {
  sign(params) {
    try {
      return jwt.sign(params, CERT, OPTIONS);
    } catch (error) {
      console.log("创建token失败!");
      process.exit();
      throw new Error(error);
    }
  },
  verify(token) {
    try {
      let decode = jwt.verify(token, CERT);

      let _decode = jwt.decode(token, { complete: true });
      let exp = _decode.exp;
      let now = Math.floor(Date.now() / 1000);
      let bf10 = now - 600;
      if (exp > bf10 && exp < now) {
        return this.sign(_decode.payload);
      } else {
        return decode;
      }
    } catch (error) {
      console.log("token验证失败!");
      process.exit();
      throw new Error(error);
    }
  },
  jwt
};
