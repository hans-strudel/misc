//Lets require/import the HTTP module
var http = require('http'),
	fs = require('fs'),
	os = require('os'),
	info;

//Lets define a port we want to listen to
const PORT = 8080;

var interfaces = os.networkInterfaces();
var addresses = [];
for (var i in interfaces) {
	for (var k in interfaces[i]) {
		var address = interfaces[i][k];
		if (address.family === "IPv4" && !address.internal) {
			addresses.push(address.address);
		}
	}
}
console.log("Your local IP is: ", addresses[0]);

//We need a function which handles requests and send response
function handleRequest(request, response){
	console.log(request.url);
	fs.readFile(request.url, 'utf8', function (err,data) {
  		if (err) {
			return console.log(err); 
		  }
  		//console.log(data);
  		info = data;
		response.end(info);
	});
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});