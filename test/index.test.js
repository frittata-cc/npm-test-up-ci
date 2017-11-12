import { readFileSync } from 'fs'
import { join } from 'path'

const test = require('ava')
const app = require('../main')
const request = require('r2')

// console.log('app', app)

const PORT = 3333

test.before(async () => {
  await app.listen(PORT)
  console.log('listening')
})

test.serial('clones repo', async t => {
  const json = readFileSync(join(__dirname, 'fixtures', 'webhook-payload.json'), 'utf8')
  const response = await request.post(`http://0.0.0.0:${PORT}`, { json: JSON.parse(json) }).text
  console.log(response)
  t.is({}, response)
})
