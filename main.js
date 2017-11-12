require('dotenv').config()
const {spawn} = require('child_process')
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

  spawnPgm('git', ['clone', url, process.env.NPM_TEST_UP_CI_GIT_DIR], {}, (err, result) => {
    if (err) {
      console.error(err)
      throw err
    }
    // const {code, output} = result
    // console.log(code, output)
    // console.info('output', output)
    // git reset --hard
    spawnPgm('git', ['reset', '--hard', commit], {
      cwd: process.env.NPM_TEST_UP_CI_GIT_DIR
    }, (err, resul) => {
      res.send({})
      // spawnPgm('git', ['clone', url, process.env.NPM_TEST_UP_CI_GIT_DIR], (err, result) => {
    })
  })
})

function spawnPgm (pgm, args, opts, done) {
  const run = spawn(pgm, args, opts)
  let output = ''

  run.stdout.on('data', data => { output += data })
  run.stderr.on('data', data => { output += data })
  run.stderr.on('error', error => done(error))
  run.on('close', code => done(null, {code, output}))
}

module.exports = app
