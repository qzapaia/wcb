var composable_middleware = require( 'composable-middleware' );

var mw = composable_middleware();

mw.use(require('./static')());
// add middlewares

module.exports = function(config){
	return mw;
}