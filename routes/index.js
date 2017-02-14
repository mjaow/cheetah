var express = require('express');
var router = express.Router();
var searcher = require('../lib/searcher');
var child_process=require('child_process');

var child=child_process.fork("./lib/searchAndIndex.js",[], {execArgv: ['--debug=5858']});

child.on("message",function(data){
  searcher.indexer.build(data.key,data.value);
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function (req, res, next) {
  res.json(searcher.search_prefix(req.body.keyword,10));
});

module.exports = router;
