const { createProxyMiddleware } = require('http-proxy-middleware');
const proxy = {
    target: process.env.docker ? 'http://backend/' : 'http://localhost:5000/',
    changeOrigin: true
}
module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware(proxy)
    );
};