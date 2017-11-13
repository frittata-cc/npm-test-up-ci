require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const tasks = require('./tasks')
app.use(bodyParser.json())

app.post('/', function (req, res) {
  const commit = req.body.head_commit.id
  const cloneUrl = req.body.repository.clone_url
  console.log('=> clone commit', commit, '@', cloneUrl)
  let url = cloneUrl.replace('//github', '//' + process.env.GITHUB_ACCESS_USERNAME + ':' + process.env.GITHUB_ACCESS_TOKEN + '@github')

  tasks(url, commit).run()
  .then(function () {
    res.send({})
  }).catch(function (err) {
    console.error(err)
  })
})

module.exports = app
