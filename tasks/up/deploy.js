const execa = require('execa')

module.exports = function (cwd = process.env.NPM_TEST_UP_CI_GIT_DIR) {
  if (process.env.NODE_ENV === 'test') return {title: 'up deploy (disabled in tests)', task: function () {}}
  return {
    title: 'up deploy',
    task: function () {
      return execa.stdout('up', ['deploy'], {cwd: process.env.NPM_TEST_UP_CI_GIT_DIR}).then(function (result) {})
    }
  }
}
