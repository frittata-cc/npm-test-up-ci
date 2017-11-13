const Listr = require('listr')

const gitClone = require('./git/clone')
const gitCheckout = require('./git/checkout')

const npmInstall = require('./npm/install')
const npmTest = require('./npm/test')

module.exports = (url, commit) => new Listr([
  {
    title: 'git',
    task: () => {
      return new Listr([
        gitClone(url, process.env.NPM_TEST_UP_CI_GIT_DIR),
        gitCheckout(commit, process.env.NPM_TEST_UP_CI_GIT_DIR)
      ], {concurrent: false})
    }
  },
  {
    title: 'npm',
    task: () => {
      return new Listr([
        npmInstall(process.env.NPM_TEST_UP_CI_GIT_DIR),
        npmTest(process.env.NPM_TEST_UP_CI_GIT_DIR)
      ], {concurrent: false})
    }
  }
])