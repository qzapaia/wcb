var app = require('./');

module.exports = function(){
	return function(req,res){
		app.render().then(function(appRes){
			res.send(appRes.html);
		})
	}
}