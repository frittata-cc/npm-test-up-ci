const execa = require('execa')

module.exports = function (url, cwd = process.env.NPM_TEST_UP_CI_GIT_DIR) {
  console.log(url, cwd)
  return {
    title: 'Cloning repo',
    task: function () {
      return execa.stdout('git', ['clone', url, cwd]).then(function (result) {})
    }
  }
}
