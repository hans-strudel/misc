var http = require('http');

var postData = "ENCRYPTED STRING HERE";

var options = {
	hostname: 'localhost',
	port: 8080,
	path: '/upload',
	method: 'POST',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Content-Length': postData.length,
		'host': "192.168.90.201"
	}
};

var req = http.request(options, function(res) {
	console.log('STATUS: ' + res.statusCode);
	console.log('HEADERS: ' + JSON.stringify(res.headers));
	res.setEncoding('utf8');
	res.on('data', function (chunk) {
		console.log('BODY: ' + chunk);
	});
	res.on('end', function() {
		console.log('No more data in response.')
	})
});

req.on('error', function(e) {
	console.log('problem with request: ' + e.message);
});

// write data to request body
req.write(postData);
req.end();