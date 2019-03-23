const express = require('express');
let app = express();
var bodyParser = require('body-parser');
var helper = require('../helpers/github');
var db = require('../database/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  var results;
  
  var callback = (error, response, body) => {
    results = JSON.parse(body);
    db.save(results);
  };
  
  helper.getReposByUsername(req.body.term, callback);
  
  res.end();
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

