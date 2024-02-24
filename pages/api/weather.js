const { createProxyMiddleware } = require('http-proxy-middleware');

export default createProxyMiddleware({
  target: 'https://api.hgbrasil.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api/weather': '/weather', 
  },
});
