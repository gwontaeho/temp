const jwt = require("jsonwebtoken");

exports.signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);

exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (token) {
        req.decoded = jwt.verify(token, process.env.JWT_SECRET);
        return next();
    } else {
        // token 없음
    }
};
