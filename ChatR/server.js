

var http = require('http'),
	fs = require('fs'),
	DEBUG = true, body = "", info = "";
	
const PORT = 8080; //can be anything as long as its open

fs.readFile('servers.json', 'utf8', function (err, data) {
	if (err) { return console.log(err);}
	info = JSON.parse(data);
})

function sendmsg(body){
	var i = Math.floor(Math.random()*info.head.entries);
	console.log(i);
	var options = {
		hostname: info[i].ip,
		port: info[i].port,
		path: '/msg',
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': body.length
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
			console.log('No more data in response. \n\n\n')
		})
	});

	req.on('error', function(e) {
		console.log('problem with request: ' + e.message);
	});
	
	// write data to request body
	req.write(body);
	req.end();
}

//handle requests and send response
function handleReq(request, response){
	console.log("Connection Made: ", request.connection.remoteAddress);
	console.log(request.headers);
	request.on('data', function (chunk) {
		body += chunk;
	});
	request.on('end', function(){
		console.log("post data:", body);
		
		sendmsg(body);
		body = '';
	})
	response.end("test");
}

//create a server
var server = http.createServer(handleReq);

//start server
server.listen(PORT,function(){
	//server is up and running
	console.log("Server Listening for Data on Port: ", PORT);
})