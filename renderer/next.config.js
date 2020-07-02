const withCSS = require('@zeit/next-css');
module.exports = withCSS({
    webpack(config) {
      config.target = 'electron-renderer';
      return config;
    },
    exportPathMap() {
      return {
        '/': { page: '/index' }
      }
    }
  });