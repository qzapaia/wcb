var express = require('express');
var path = require('path');

var rootDir = path.dirname(require.main.filename);
var router = express.Router();

router.get('/',function(req, res, next) {
	res.end('home');
});

module.exports = function(config){
	return router;
}