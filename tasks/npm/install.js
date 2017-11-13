const execa = require('execa')

module.exports = (cwd = process.env.NPM_TEST_UP_CI_GIT_DIR) => {
  return {
    title: 'npm install',
    task: () => execa.stdout('npm', ['install'], {cwd: process.env.NPM_TEST_UP_CI_GIT_DIR}).then(result => {})
  }
}
