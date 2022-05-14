const path = require('path')

const express = require('express')
const dotenv = require('dotenv').config({path: path.resolve(__dirname, '../../.env')})
const favicon = require('serve-favicon')

const PORT = process.env.PORT || 3001


const app = express()
  .use(express.static(path.resolve(__dirname, '../../client/dist')))
  .use(favicon(path.resolve(__dirname, '../../client/src/assets/favicon.ico')))
  .listen(PORT, () => console.log(`Listening on ${PORT}`))
