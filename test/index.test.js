const test = require('ava')
const app = require('../main')
const request = require('r2')
const {readFileSync} = require('fs')
const exec = require('child_process').exec
const {join} = require('path')
const getPort = require('get-port')

let PORT
let server
test.before(async () => {
  PORT = await getPort({port: 3001})
  server = await app.listen(PORT)
})

test.after(async () => {
  const gitDir = join(__dirname, '..', 'test', 'fixtures', 'git')
  exec('rm -r ' + gitDir, Function.prototype)
  await server.close()
})

test.serial('clones repo', async t => {
  const json = readFileSync(join(__dirname, 'fixtures', 'webhook-payload.json'), 'utf8')
  const response = await request.post(`http://0.0.0.0:${PORT}`, { json: JSON.parse(json) }).json
  t.truthy(response)
})
