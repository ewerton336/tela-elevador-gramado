const { createProxyMiddleware } = require('http-proxy-middleware');
import { config } from '../../config'


export default createProxyMiddleware({
  target: 'https://api.hgbrasil.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api/weather': '/weather', 
  },
});
