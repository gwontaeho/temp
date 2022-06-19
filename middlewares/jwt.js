const jwt = require("jsonwebtoken");

exports.signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);

exports.verifyToken = (req, res, next) => {
  try {
    req.decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET);
    return next();
  } catch (error) {
    console.log(error);
  }
};
