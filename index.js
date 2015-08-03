var express = require('express');
var cookieParser = require('cookie-parser');
var compression = require('compression')
var argv = require('minimist')(process.argv.slice(2));
var middlewares = require('./middlewares/');
var routes = require('./routes/');

var app = express();
var port = process.env.PORT || 3045;
var httpsPort = 3008;

if(argv.dev){
	app.use(require('connect-livereload')());
}else{
	app.use(compression());
}

app.set('trust proxy',true);
app.use(cookieParser());
app.use(middlewares());
app.use(routes());
app.use(express.static('public'));

app.listen(port,function () {
	console.log('\n');
	console.log('running on http://localhost:' + port);
	console.log('running babel - it allows es6');
});
