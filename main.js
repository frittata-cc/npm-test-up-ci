require('dotenv').config()
const {spawn} = require('child_process')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())

app.post('/', function (req, res) {
  // console.log('webhook payload', req.body)
  console.log('req.body', req.body)
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

  spawnPgm('git ', ['clone', url], (err, result) => {
    if (err) {
      console.error(err)
      throw err
    }
    const {code, output} = result
    console.log(code, output)
    console.info('output', output)
    res.send({})
  })
})

function spawnPgm (pgm, args, done) {
  const run = spawn(pgm, args)
  let output = ''

  run.stdout.on('data', data => { output += data })
  run.stderr.on('data', data => { output += data })
  run.stderr.on('error', error => done(error))
  run.on('close', code => done(null, {code, output}))
}

// function run (task, args) {
//   spawnPgm(task, args)
// }

module.exports = app
