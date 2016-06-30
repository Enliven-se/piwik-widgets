const conf = require('./gulp.conf');
const wiredep = require('wiredep');

module.exports = function listFiles() {
  const wiredepOptions = Object.assign({}, conf.wiredep, {
    overrides: {
      react: {main: ['react-with-addons.js', 'react-dom.js']}
    },
    dependencies: true,
    devDependencies: true
  });

  const patterns = wiredep(wiredepOptions).js.concat([
    conf.path.tmp('app/**/*.js')
  ]);

  const files = patterns.map(pattern => ({pattern}));
  files.push({
    pattern: conf.path.src('assets/**/*'),
    included: false,
    served: true,
    watched: false
  });
  return files;
};
