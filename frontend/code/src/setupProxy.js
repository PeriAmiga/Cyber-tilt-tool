const { createProxyMiddleware } = require('http-proxy-middleware');
const proxy = {
    target: process.env.docker ? 'https://backend/' : 'https://localhost:5000/',
    changeOrigin: true,
    secure: true
}
module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware(proxy)
    );
};