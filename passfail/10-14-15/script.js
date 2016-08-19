//hansstrausl
var DEBUG = true;

var fs = require('fs');
	
var SN_LIST = 'sn.json';

var info;
	
fs.readFile(SN_LIST, 'utf8', function (err,data) {
  	if (err) {
		return console.log(err); 
	}
	
	info = JSON.parse(data);
	if (DEBUG) require('nw.gui').Window.get().showDevTools();
	SN.display(45622);
});

var SN = {
	add: function(s_n, obj) {
		// add user info to check file and/or db
		if (info.hasOwnProperty(s_n)){
			console.log('Username ' + s_n + ' is already in use');
			console.log(info[s_n][obj[0]])
			info[s_n][obj[0]] = {};
			info[s_n][obj[0]].Fix = "test";
			info[s_n][obj[0]].Fix = obj[1];
			info[s_n][obj[0]].Failure = obj[3];
			info[s_n][obj[0]].Comment = obj[4];
			save();
			SN.display(s_n);
		} else {
			info[s_n] = {};
			save();
			console.log('User' + s_n + ' added');
		}
	},
	remove: function(s_n) {
		// remove user from check file and/or db		
		delete info[s_n];
		save();
		console.log('User ' + s_n + ' removed')
	},
	get: function(s_n) {
		// get user info and then...
		return info[s_n];
	},
	display: function(s_n) {
		prvData = document.getElementsByClassName('unstable');
		len = prvData.length;
		for (var i = 0; i < len; i++){
			prvData[0].parentNode.removeChild(prvData[0]);
		}
		
		// get and format info from JSON file
		document.getElementById('sn_id').innerHTML = s_n;
		index = Object.keys(info[s_n]);
		//console.log(index[0]);
		//console.log(Object.keys(info[s_n])[0]);
		htmlData = '';

		for (var i = 0; i < index.length; i++){
			var basenode = document.getElementById('table');
			var row = document.createElement('tr');
			row.className = 'unstable';
			htmlData = '<td>' + index[i] + '</td>' + '<td>' + info[s_n][index[i]]['Fix'] + '</td>' +
						'<td>' + ((i==0)?"1st":((i==1)?"2nd":((i==2)?"3rd":((i+1)+'th')))) + //dirty
						'</td>' + '<td>' + info[s_n][index[i]]['Failure'] + '</td>' +
						'<td>' + info[s_n][index[i]]['Comment'];
			row.innerHTML = htmlData;
			basenode.appendChild(row);
		}
		var basenode = document.getElementById('table');
		var row = document.createElement('tr');
		row.className = 'unstable add';
		row.innerHTML = '<td><input class="date"></input></td><td><input class="fix"></input></td><td><input class="status"></input></td><td><input class="failure"></input></td><td><input class="comment"></input></td></tr>';
		basenode.appendChild(row);
		console.log(htmlData)
	}
}


function save() {
	fs.writeFile(SN_LIST, JSON.stringify(info), function(err) {
		if(err) {
			return console.log(err);
		}

		console.log('The file was saved!');
	}); 
}

function init(){
	
	document.getElementById('add').onclick = function(){
		s_n = document.getElementById('sn_id');
		inputs = document.getElementsByClassName('add')[0].getElementsByTagName('input');
		console.log(inputs);
		var obj = [];
		for (i=0;i<inputs.length;i++){
			obj[i] = inputs[i].value;
		}
		console.log(obj);
		if (typeof s_n.innerHTML != 'undefined'){
			SN.add(s_n.innerHTML, obj);
		} else {
			s_n.style.border = '1px solid red';
		}
	}
	document.getElementById('submit').onclick = function(){
		query = document.getElementById('search');
		if (typeof query.value != 'undefined'){
			SN.display(query.value);
		} else {
			query.style.border = '1px solid red';
		}
	}
}

window.addEventListener('load', init, false);