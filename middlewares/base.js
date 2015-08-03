module.exports = function(config){
	return function middleware(req,res,next){
		next();
	}
}