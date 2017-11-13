require('dotenv').config()
const execa = require('execa')
const Listr = require('listr')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())

const gitClone = require('./tasks/git/clone')
const gitCheckout = require('./tasks/git/checkout')

app.post('/', function (req, res) {
  const {
    head_commit: {
      id: commit
    },
    repository: {
      clone_url
    }
  } = req.body
  console.log(`=> clone commit ${commit}`)
  console.log('clone_url', clone_url)
  let url = clone_url.replace('//github', `//${process.env.GITHUB_ACCESS_USERNAME}:${process.env.GITHUB_ACCESS_TOKEN}@github`)
  console.info('(url)', url)

  const tasks = new Listr([
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
          {
            title: 'npm install',
            task: () => execa.stdout('npm', ['install'], {cwd: process.env.NPM_TEST_UP_CI_GIT_DIR}).then(result => {})
          },
          {
            title: 'npm t',
            task: () => execa.stdout('npm', ['t'], {cwd: process.env.NPM_TEST_UP_CI_GIT_DIR}).then(result => {})
          }
        ], {concurrent: false})
      }
    }
  ])

  tasks.run()
  .then(() => {
    res.send({})
  }).catch(err => {
    console.error(err)
  })
})

module.exports = app
