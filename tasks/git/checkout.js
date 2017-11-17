const execa = require('execa')

module.exports = function (commit, cwd = process.env.NPM_TEST_UP_CI_GIT_DIR) {
  return {
    title: 'Checking  out  commit',
    task: function () {
      return execa.stdout('git', ['reset', '--hard', commit], {cwd}).then(function (result) {})
    }
  }
}
