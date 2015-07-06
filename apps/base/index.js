var q = require('q');

exports.render = function(config){
	var deferred = q.defer();

	deferred.resolve({
		__appname:'base',
		__dirname:__dirname,
		html:'<p> foo lalala </p>'
	})

	return deferred.promise;
}