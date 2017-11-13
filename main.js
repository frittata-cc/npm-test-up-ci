require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const tasks = require('./tasks')
app.use(bodyParser.json())

app.post('/', function (req, res) {
  const {head_commit: {id: commit}, repository: {clone_url}} = req.body
  console.log(`=> clone commit ${commit}`)
  console.log('clone_url', clone_url)
  let url = clone_url.replace('//github', `//${process.env.GITHUB_ACCESS_USERNAME}:${process.env.GITHUB_ACCESS_TOKEN}@github`)

  tasks(url, commit).run()
  .then(() => {
    res.send({})
  }).catch(err => {
    console.error(err)
  })
})

module.exports = app
