module.exports = {
  server: './',
  host: '127.0.0.1',
  port: '3000',
  open: false,
  ui: false,
  ghostMode: false,
  files: ['./*.html', './css/processed/*.css', './js/es6/*.js'],
  watchEvents: ['change', 'add'],
};
