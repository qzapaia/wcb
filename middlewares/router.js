var express = require('express');
var path = require('path');

var rootDir = path.dirname(require.main.filename);
var router = express.Router();

var apps = {
	layoutMiddleware:require('../apps/layout/middleware'),
	baseMiddleware:require('../apps/base/middleware')
}


router.get('/',apps.layoutMiddleware(),apps.baseMiddleware());

module.exports = function(config){
	return router;
}