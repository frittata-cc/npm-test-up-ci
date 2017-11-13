const execa = require('execa')

module.exports = (url, cwd = process.env.NPM_TEST_UP_CI_GIT_DIR) => {
  console.log(url, cwd)
  return {
    title: 'Cloning repo',
    task: () => execa.stdout('git', ['clone', url, cwd]).then(result => {})
  }
}
