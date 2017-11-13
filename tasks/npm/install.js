const execa = require('execa')

module.exports = function (cwd = process.env.NPM_TEST_UP_CI_GIT_DIR) {
  return {
    title: 'npm install',
    task: function () {
      return execa.stdout('npm', ['install'], {cwd: process.env.NPM_TEST_UP_CI_GIT_DIR}).then(function (result) {})
    }
  }
}
