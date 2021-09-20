import { defineConfig } from 'wmr';
import { createProxyMiddleware } from 'http-proxy-middleware';

const proxy = createProxyMiddleware({
  changeOrigin: true,
  ws: true,
  logLevel: 'debug',
  target: 'http://localhost:5000',
  pathRewrite: {
    '/api': '/api',
    '/auth': '/auth',
  },
});

// Full list of options: https://wmr.dev/docs/configuration
export default defineConfig((options) => {
  return {
    /* Your configuration here */
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
    },
    middleware: [
      (req, res, next) => {
        if (req.path.match(/^\/api|auth(\/|$)/) && options.mode !== 'build') {
          proxy(req, res, next);
        } else {
          next();
        }
      },
    ],
  };
});
