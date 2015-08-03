var q = require('q');
var readFile = require('fs-readfile-promise');
var path = require('path');

exports.__appname = 'base';
exports.__dirname = __dirname;

exports.render = function(config){
	var templatePath = path.resolve(__dirname,'./template.html');
	
	return readFile(templatePath).then(function(template){
		
		return template.toString();

	}).then(function(template){
		
		var deferred = q.defer();		

		deferred.resolve({
			html:template
		})

		return deferred.promise;
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