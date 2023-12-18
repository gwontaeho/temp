const jwt = require("jsonwebtoken");

exports.signToken = (payload, options) => jwt.sign(payload, process.env.JWT_SECRET, options);

exports.verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {}
};

exports.authorization = (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace("Bearer ", "");
        req.verified = jwt.verify(token, process.env.JWT_SECRET);
        return next();
    } catch (error) {
        return res.clearCookie("token").redirect("/");
    }
};
