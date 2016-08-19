// Hans Strausl 2015 
// launches chat server

var os = require('os'),
	http = require('http');

var User = require('./users.js').User;

const PORT = 8080;

var body ="";

function handleReq(request, response){
	console.log('Connection Made: ', request.connection.remoteAddress);
	console.log(request.headers);
	request.on('data', function (chunk) {
		body += chunk;
	});
	request.on('end', function(){
		console.log('Message Recieved: ', body);
		body = "";
	})
	response.end('test');
}

//create a server
var server = http.createServer(handleReq);

//start server
server.listen(PORT,function(){var interfaces = os.networkInterfaces();
	var addresses = [];
	for (var i in interfaces) {
		for (var k in interfaces[i]) {
			var address = interfaces[i][k];
			if (address.family === 'IPv4' && !address.internal) {
				addresses.push(address.address);
			}
		}
	}
	console.log('Local IP: ', addresses[0]);
	//server is up and running
	console.log("Server Listening for Data on Port: ", PORT);
	console.log(User.get('JaneDoe'));
})