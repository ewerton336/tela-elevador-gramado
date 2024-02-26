const { createProxyMiddleware } = require('http-proxy-middleware');
import { config } from '../../config'


export default createProxyMiddleware({
  target: 'https://newsapi.org/v2/top-headlines?country=br&apiKey=a4b4b67d75db430483b9abd07210adb9',
  changeOrigin: true,
  pathRewrite: {
    '^/api/news': '/news', 
  },
});
