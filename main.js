require('dotenv').config()
const execa = require('execa')
const Listr = require('listr')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())

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
          {
            title: 'Cloning repo',
            task: () => execa.stdout('git', ['clone', url, process.env.NPM_TEST_UP_CI_GIT_DIR]).then(result => {})
          },
          {
            title: 'Checking out commit',
            task: () => execa.stdout('git', ['reset', '--hard', commit], {cwd: process.env.NPM_TEST_UP_CI_GIT_DIR}).then(result => {})
          }
        ], {concurrent: false})
      }
    },
    {
      title: 'npm',
      task: () => {
        return new Listr([
          {
            title: 'npm install',
            task: () => execa.stdout('npm', ['install', url, process.env.NPM_TEST_UP_CI_GIT_DIR], {cwd: process.env.NPM_TEST_UP_CI_GIT_DIR}).then(result => {})
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
