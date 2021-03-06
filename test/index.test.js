const test = require('ava')
const app = require('../main')
const request = require('r2')
const {readFileSync} = require('fs')
const exec = require('child_process').exec
const {join} = require('path')
const findPort = require('find-port-sync')

const PORT = findPort()
let server
test.before(async function () {
  server = await app.listen(PORT)
})

test.after(async function () {
  const gitDir = join(__dirname, '..', 'build')
  exec('rm -r ' + gitDir, Function.prototype)
  await server.close()
})

test.serial('clones repo', async t => {
  const payload = readFileSync(join(__dirname, 'fixtures', 'webhook-payload.json'), 'utf8')
  const json = JSON.parse(payload)
  const response = await request.post(`http://0.0.0.0:${PORT}`, { json }).json
  t.truthy(response)
})
