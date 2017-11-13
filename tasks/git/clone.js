const execa = require('execa')

module.exports = (url, gitDir = process.env.NPM_TEST_UP_CI_GIT_DIR) => {
  return {
    title: 'Cloning repo',
    task: () => execa.stdout('git', ['clone', url]).then(result => {})
  }
}
