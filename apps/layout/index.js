var q = require('q');
var readFile = require('fs-readfile-promise');
var path = require('path');
var mustache = require('mustache');

exports.__appname = 'layout';
exports.__dirname = __dirname;

exports.render = function(config = {}){
	var templatePath = path.resolve(__dirname,'./template.html');
	
	return readFile(templatePath).then(function(template){
		var data = {
			subAppName:config.subAppName || '',
			subAppHTML:config.subAppHTML || ''
		}
		return mustache.render(template.toString(),data);
	}).then(function(template){
		
		var deferred = q.defer();

		deferred.resolve({
			html:template
		})

		return deferred.promise;
	})

}

exports.middleware = function(config){
	var that = this;
    return function(req,res){
		// var newRes = Object.create(res);      
		res.newSend = res.send;

        res.send = function(response){
	        var layoutConfig = {
        		subAppName:config.app.__appname,
        		subAppHTML:response
        	}

            that.render(layoutConfig).then(function(layout){
                res.newSend(layout.html)
            });
        };
        config.app.middleware()(req,res);
    }
}