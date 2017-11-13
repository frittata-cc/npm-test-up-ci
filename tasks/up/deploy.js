const execa = require('execa')

module.exports = (cwd = process.env.NPM_TEST_UP_CI_GIT_DIR) => {
  if (process.env.NODE_ENV === 'test') return {title: 'up deploy (disabled in tests)', task: () => {}}
  return {
    title: 'up deploy',
    task: () => execa.stdout('up', ['deploy'], {cwd: process.env.NPM_TEST_UP_CI_GIT_DIR}).then(result => {})
  }
}
