var q = require('q');

exports.render = function(res,res,config){
	var deferred = q.deferred();

	deferred.resolve({
		html:''
	})

	return deferred.promise;
}