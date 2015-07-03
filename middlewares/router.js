var express = require('express');
var path = require('path');

var rootDir = path.dirname(require.main.filename);
var router = express.Router();

var apps = {
	layout:require('../apps/layout')
}


router.get('/',apps.layout(),function(req, res, next) {
	res.send('<p>some foo foo lslsl for</p>');
});

module.exports = function(config){
	return router;
}