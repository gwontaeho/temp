const jwt = require("jsonwebtoken");

exports.signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

exports.verifyToken = (req, res, next) => {
  try {
    req.decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET);
    return next();
  } catch (error) {
    return res.status(401).json({
      code: 401,
      message: "유효하지 않은 토큰입니다",
    });
  }
};
