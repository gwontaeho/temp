const createProxyMiddleware = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://121.170.141.227:3005",
      changeOrigin: true,
    })
  );
  app.use(
    "/img",
    createProxyMiddleware({
      target: "http://121.170.141.227:3005",
      changeOrigin: true,
    })
  );
  app.use(
    "/crn",
    createProxyMiddleware({
      target: "https://teht.hometax.go.kr",
      changeOrigin: true,
      pathRewrite: {
        "^/crn": "",
      },
    })
  );
};
