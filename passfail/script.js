var fs = require('fs');

var DEBUG = true,
	_SC, 
	_SN;

function init(){
	data = require('./data.json');
	view.updateSClist();
	//view.updateSNlist(_SC);
	//view.displaySN(_SC, _SN);
	document.getElementById('addsc').addEventListener('keydown', function(e){
		if (e.keyCode === 13){
			addSC(this.value);
		}
	}, false)
}

function save(){
	fs.writeFile('data.json', JSON.stringify(data), function (err) {
		if (err) throw err;
		console.log('Saved!');
	})
}
function addSC(p){
	data[p] = {};
	save();
	view.updateSClist();
}

function addSN(){
	p = prompt('New SN', '')
	data[_SC][p] = [];
	save();
	view.updateSNlist(_SC)
}


function add(elm){
	
	console.log(elm, _SC, _SN);
	
	var inputs = elm.getElementsByTagName('input');
	CLEAN = true;
	for (var i=0;i<inputs.length;i++){
		if (inputs[i].value == ''){
			inputs[i].style.border = '1px solid red';
			inputs[i].focus();
			CLEAN = false;
		}
	}
	if (CLEAN){
		newObj  = {
			date: inputs[0].value,
			fix: inputs[1].value,
			fail: inputs[3].value,
			comm: inputs[4].value,
		}
		data[_SC][_SN].push(newObj);
		view.displaySN(_SC, _SN);
		save();
	}

}

var view = {
	updateSClist: function(){
		var scFinder = document.getElementById('scfinder');
		var len = (nodes = scFinder.getElementsByClassName('node')).length;
		var brlen = (brnodes = scFinder.getElementsByTagName('br')).length;
		for (i = 0; i < len; i++){
			scFinder.removeChild(nodes[0]);
		}
		for (i = 0; i< brlen; i++){
			scFinder.removeChild(brnodes[0]);
		}
		
		var SC = Object.keys(data),
			scFinder = document.getElementById('scfinder');
			
		SC.forEach(function(elem, index, array){
			scRow = document.createElement('li');
			brk = document.createElement('br');
			scRow.className = 'node';
			scRow.innerHTML = elem;
			//if(index==0){_SC = elem};
			(index==0)?_SC=elem:0; // default _SC is first elem
			
			scRow.onclick = function(e){
				_SC = this.innerHTML;
				view.updateSNlist(_SC);
			};
			scFinder.appendChild(scRow);
			scFinder.appendChild(brk);
		})
	},
	updateSNlist: function(SC){
		var scs = document.getElementById('scfinder').getElementsByClassName('node');
		if (document.getElementById('scfinder').getElementsByClassName('nodefocused').length != 0){
					document.getElementById('scfinder').getElementsByClassName('nodefocused')[0].className = 'node';
			}
		for (i = 0; i < scs.length; i++){
			
			if (scs[i].innerHTML == SC){
				console.log('yeee');
				scs[i].className = 'node nodefocused';
			}
		}
		var snFinder = document.getElementById('snfinder');
		var len = (nodes = snFinder.getElementsByClassName('node')).length;
		var brlen = (brnodes = snFinder.getElementsByTagName('br')).length;
		for (i = 0; i < len; i++){
			snFinder.removeChild(nodes[0]);
		}
		for (i = 0; i< brlen; i++){
			snFinder.removeChild(brnodes[0]);
		}
		var SN = Object.keys(data[SC]);
		console.log(SN);
		var snFinder = document.getElementById('snfinder');
		SN.forEach(function(elem, index, array){
			(index==0)?_SN=elem:0; // default _SC is first elem
			snRow = document.createElement('li');
			brk = document.createElement('br');
			snRow.className = 'node';
			snRow.innerHTML = elem;
			snRow.onclick = function(e){
				if (snFinder.getElementsByClassName('nodefocused').length != 0){
					snFinder.getElementsByClassName('nodefocused')[0].className = 'node';
				}
				this.className = 'node nodefocused';
				console.log(this);
				_SN = this.innerHTML;
				view.displaySN(_SC, _SN);
			
			}
			snFinder.appendChild(snRow);
			snFinder.appendChild(brk);
		})
	},
	displaySN: function(SC, SN){
		
		info = data[SC][SN];
		console.log(info)
		var table = document.getElementById('table');
		if ((len = (rows = table.getElementsByClassName('unstable')).length) > 0){ //dirtyyyy
			for(i=0;i<len;i++){
				rows[0].parentNode.removeChild(rows[0]);
			}
		}
		
		info.forEach(function(elem, index, array){
			row = document.createElement('tr');
			row.className = 'unstable';
			htmlData = '<td>' + elem.date + '</td>' + '<td>' + elem.fix + '</td>' +
						'<td>' + ((index==0)?"1st":((index==1)?"2nd":((index==2)?"3rd":((index+1)+'th')))) + //dirty
						'</td>' + '<td>' + elem.fail + '</td>' + '<td>' + elem.comm;
			row.innerHTML = htmlData;
			table.appendChild(row);
		})
		row = document.createElement('tr');
		row.className = 'unstable add';
		row.innerHTML = '<td><input class="date"></input></td><td><input class="fix"></input></td><td><input class="status"></input></td><td><input class="failure"></input></td><td><input class="comment"></input></td><td><button id="add" onclick="add(this.parentElement.parentElement)">ADD</buton></td>';
		table.appendChild(row);
	}
}

if (DEBUG){ 
require('nw.gui').Window.get().showDevTools(); 
require('nw.gui').Window.get().enterFullscreen();
}
window.addEventListener('load', init, false);