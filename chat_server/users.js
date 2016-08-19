// Hans Strausl 2015
// manages users

var fs = require('fs');
	
var USER_LIST = 'userlist.json';

var info;
	
fs.readFile(USER_LIST, 'utf8', function (err,data) {
  	if (err) {
		return console.log(err); 
	}
	
	info = JSON.parse(data);
	
	// examples
	var obj = {
		'password': "aVerySecurePass123",
		'department': "Engineering",
		'title': "Lead",
		'status': "Busy"
	}
/*	
	//User.get('SallyTwoChainz').newVal = 555;
	//delete User.get('SallyTwoChainz').newVal;
	User.add('JaneDoe', obj);
	User.remove('JohnDoe');
	console.log(User.get('JaneDoe').department);
	//console.log(info);
	// examples
	*/
});

var User = {

	add: function(username, userInfo) {
		// add user info to check file and/or db
		if (info.USERS.hasOwnProperty(username)){
			console.log('Username ' + username + ' is already in use');
		} else {
			info.USERS[username] = userInfo;
			save();
			console.log('User' + username + ' added');
		}
	},
	remove: function(username) {
		// remove user from check file and/or db		
		delete info.USERS[username];
		save();
		console.log('User ' + username + ' removed')
	},
	get: function(username) {
		// get user info and then...
		return info.USERS[username];
	}
}


function save() {
	fs.writeFile(USER_LIST, JSON.stringify(info), function(err) {
		if(err) {
			return console.log(err);
		}

		console.log("The file was saved!");
	}); 
}

module.exports.User = User;