// Proxy configuration for handling CORS
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://celebrity-backend-f4ik.onrender.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // remove /api prefix when forwarding
      },
      onProxyReq: (proxyReq, req, res) => {
        // Add CORS headers - will be updated after deployment with the actual Render URL
        res.header('Access-Control-Allow-Origin', '*'); // Temporary wildcard - update after deployment
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.header('Access-Control-Allow-Credentials', 'true');
      },
    })
  );
};
