const {spawn} = require('child_process')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())

const {PORT = 3000} = process.env

app.post('/', function (req, res) {
  console.log('webhook payload', req.body)
  // const args = req.query.args ? req.query.args.split(',') : [])
  spawnPgm('echo', ['hello'], (code, output) => {
    console.log('output', output)
    res.set('Content-Type', 'text/plain')
    res.send(output)
  })
})

function spawnPgm (pgm, args, done) {
  const run = spawn(pgm, args)
  let output = ''

  run.stdout.on('data', data => { output += data })
  run.stderr.on('data', data => { output += data })
  run.on('close', code => done(code, output))
}

// function run (task, args) {
//   spawnPgm(task, args)
// }

app.listen(PORT)
