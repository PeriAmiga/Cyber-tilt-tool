const { createProxyMiddleware } = require('http-proxy-middleware');
const proxy = {
    target: 'https://localhost:5000/',
    changeOrigin: true,
    secure: false
}
module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware(proxy)
    );
};