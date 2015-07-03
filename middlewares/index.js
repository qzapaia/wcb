var composable_middleware = require( 'composable-middleware' );
var router = require('./router');

var mw = composable_middleware();

mw.use(router());
// add middlewares


module.exports = function(config){
	return mw;
}