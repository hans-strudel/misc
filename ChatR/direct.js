var http = require("http"),
	prompt = require("prompt"),
	os = require("os"),
	chalk = require("chalk");

var debug = false, body = "", info = "";

var init_info = [
	{
		name: "PORT",
		validator: /^[0-9]/
	},
	{
		name: "Handle"
	},
	{
		name: "Connect"
	}
];

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


prompt.start();
var server = http.createServer(handleReq);

prompt.get(init_info, function (err, result){
	if (err) {return console.log(err)};
	//console.log(result);
	info = result;
	server.listen(result.PORT, function() {
		console.log("Server open on port: ", result.PORT)
		if (result.Connect){
			console.log(result.Connect);
			send_msg();
		}
	});
	

});


function handleReq(request, response) {
	if (debug){
		console.log("Connection Made: ", request.connection.remoteAddress);
	}
	request.on("data", function (chunk) {
		body += chunk;
	});
	request.on("end", function(){
		console.log(body);
		body = '';
		prompt.get([{name:"MSG"}], function(err, result){
			response.write(chalk.green(info.Handle) + " > " + result.MSG);
		})
	})
	
};

function send_msg(i){
	var prompts = [
		{
			name: "IP"
		},
		{
			name: "PORT"
		},
		{
			name: "MSG"
		}
	]
	if (i === 0){
		prompts = [{
			name: "MSG"
		}]
	}
	prompt.get(prompts, function(err, result){
		if (result.IP != undefined || result.PORT != undefined){
			IP = result.IP;
			PORT = result.PORT;
		}
		var msg = info.Handle + " > " + result.MSG;
		options = {
			hostname: IP,
			port: PORT,
			path: "",
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				"Content-Length": msg.length
			}
		}
		var req = http.request(options, function(res) {
			if (debug){
				console.log('STATUS: ' + res.statusCode);
				console.log('HEADERS: ' + JSON.stringify(res.headers));	
			}

			res.setEncoding('utf8');
			res.on('data', function (chunk) {
				console.log(chunk);
				send_msg(0);
			});
			res.on('end', function() {
				console.log('No more data in response. \n\n\n')
			})
		});
		req.on('error', function(e) {
			console.log('problem with request: ' + e.message);
		});
		
		// write data to request body
		req.write(msg);
		
	})
}

