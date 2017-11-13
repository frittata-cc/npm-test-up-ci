const Listr = require('listr')

const gitClone = require('./git/clone')
const gitCheckout = require('./git/checkout')

const npmInstall = require('./npm/install')
const npmTest = require('./npm/test')

const upDeploy = require('./up/deploy')

module.exports = function (url, commit) {
  return new Listr([
    {
      title: 'git',
      task: function () {
        return new Listr([
          gitClone(url, process.env.NPM_TEST_UP_CI_GIT_DIR),
          gitCheckout(commit, process.env.NPM_TEST_UP_CI_GIT_DIR)
        ], {concurrent: false})
      }
    },
    {
      title: 'npm',
      task: function () {
        return new Listr([
          npmInstall(process.env.NPM_TEST_UP_CI_GIT_DIR),
          npmTest(process.env.NPM_TEST_UP_CI_GIT_DIR)
        ], {concurrent: false})
      }
    },
    {
      title: 'up',
      task: function () {
        return new Listr([
          upDeploy(process.env.NPM_TEST_UP_CI_GIT_DIR)
        ], {concurrent: false})
      }
    }
  ])
}