
var express = require('express');
var fs = require('fs');
var glob = require('glob');
var path = require('path');
var $ = require('jquery');

var app = express();

app.get('/', function(req, res) {
  res.send('Welcome to the filesystem autocomplete take-home');
});

app.get('/api', function(req, res) {
  let results = [];
  if (req.query && req.query.q) {
    let q = req.query.q;
    var stats;
    try {
      stats = fs.lstatSync(q)
    } catch (err) {}
    if (stats && stats.isDirectory()) {
      q += '/*';
    } else if (q.indexOf('*') === -1) {
      q += '*';
    }
    results = glob.sync(q, { cwd: '/' });
  }
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(results));
});

app.listen(3000, function () {
  console.log('fs-ac server is running at http://localhost:3000/');
});
