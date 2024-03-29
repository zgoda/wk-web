import { defineConfig } from 'wmr';
import { createProxyMiddleware } from 'http-proxy-middleware';

export default defineConfig((options) => {
  /** @type {import('wmr').Options} */
  // @ts-ignore
  const config = {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
    },
  };
  if (options.mode === 'start') {
    const proxy = createProxyMiddleware({
      changeOrigin: true,
      ws: false,
      logLevel: 'debug',
      target: 'http://127.0.0.1:5000',
      pathRewrite: {
        '/api': '/v1/api',
        '/auth': '/v1/auth',
      },
    });
    config.middleware = [
      (req, res, next) => {
        if (req.path.match(/^\/api|auth(\/|$)/)) {
          // @ts-ignore
          proxy(req, res, next);
        } else {
          next();
        }
      },
    ];
  }
  return config;
});
