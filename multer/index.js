const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = require("../aws");
const path = require("path");

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "public/image/product/");
//     },
//     filename: function (req, file, cb) {
//       cb(
//         null,
//         req.decoded.id +
//           "_" +
//           new Date().valueOf() +
//           path.extname(file.originalname)
//       );
//     },
//   }),
// });

exports.productUpload = multer({
  storage: multerS3({
    s3,
    bucket: "taeho-market",
    acl: "public-read",
    key(req, file, cb) {
      const fileName =
        req.decoded.id +
        "_" +
        new Date().valueOf() +
        path.extname(file.originalname);
      cb(null, `product/${fileName}`);
    },
  }),
});

exports.userUpload = multer({
  storage: multerS3({
    s3,
    bucket: "taeho-market",
    acl: "public-read",
    key(req, file, cb) {
      const fileName =
        req.decoded.id +
        "_" +
        new Date().valueOf() +
        path.extname(file.originalname);
      cb(null, `user/${fileName}`);
    },
  }),
});
