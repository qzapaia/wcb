var tamper = require('tamper');

var wrapContent = tamper(function(req, res) {
    // Look at the request or the response headers and decide what to do. 
    // In this case we only want to modify html responses: 
    if (! /text\/html/.test(res.getHeader('Content-Type'))) {
    	console.log(res.getHeader('Content-Type'))
        return;
    }

    // Return a function in order to capture and modify the response body: 
    return function(body) {
    	console.log('intercept')
        return body.replace(/foo/g, 'bar')
    }
})


module.exports = function() {
    return wrapContent;
}