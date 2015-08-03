var q = require('q');
var readFile = require('fs-readfile-promise');
var path = require('path');
var mustache = require('mustache');

exports.__appname = 'base';
exports.__dirname = __dirname;

exports.render = function(config){
	var that = this;
	var templatePath = path.resolve(__dirname,'./template.html');
	
	return readFile(templatePath).then(function(template){
		var data = {
			__appname:that.__appname
		}
		var response = {
			html:mustache.render(template.toString(),data)
		}

		return response;

	});
}

exports.middleware = function(){
	var that = this;
	
	return function(req,res){
		that.render().then(function(appRes){
			res.send(appRes.html);
		})
	}
}