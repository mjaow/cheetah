var express = require('express');
var router = express.Router();
var Searcher = require('../lib/searcher');
var child_process=require('child_process');
var searcher=new Searcher();

child_process.fork();
searcher.search("/Users/loda");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function (req, res, next) {
  var k = req.body.keyword;
  res.json(searcher.search_prefix(k,10));
});

module.exports = router;
