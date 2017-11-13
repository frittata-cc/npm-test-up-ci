const execa = require('execa')

module.exports = (cwd = process.env.NPM_TEST_UP_CI_GIT_DIR) => {
  return {
    title: 'npm test',
    task: () => execa.stdout('npm', ['test'], {cwd: process.env.NPM_TEST_UP_CI_GIT_DIR}).then(result => {})
  }
}
