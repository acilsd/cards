/*eslint no-console: "off"*/
'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 8090;

let data = {};

express()
  .use(cors())
  .use(express.static(__dirname + '/build'))
  .use(bodyParser.json())
  .get('/api/data', (req, res) => res.json(data))
  .post('/api/data', (req, res) => res.json(data = req.body))
  .get('*', (req, res) => res.sendFile(__dirname + '/build/index.html'))
  .listen(port);

console.log('Server listening on:', port);
