var q = require('q');

module.exports = function(req,res){
	var deferred = q.deferred();

	deferred.resolve({
		html:''
	})

	return deferred.promise;
}