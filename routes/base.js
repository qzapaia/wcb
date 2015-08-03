var express = require('express');
var path = require('path');

var rootDir = path.dirname(require.main.filename);
var router = express.Router();

var apps = {
	layout:require('../apps/layout'),
	base:require('../apps/base/')
}

router.get('/',apps.layout.middleware({app:apps.base}));



module.exports = function(config){
	return router;
}