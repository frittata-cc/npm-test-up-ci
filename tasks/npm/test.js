const execa = require('execa')

module.exports = function (cwd = process.env.NPM_TEST_UP_CI_GIT_DIR) {
  return {
    title: 'npm test',
    task: function () {
      return execa.stdout('npm', ['test'], {cwd: process.env.NPM_TEST_UP_CI_GIT_DIR}).then(function (result) {})
    }
  }
}
