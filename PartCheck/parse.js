//Hans Strausl @ Bestronics 2015
// parse data and pass to checkpart.js

require('./checkpart.js')

XLS = require('xlsjs')

var WK = XLS.readFile('test.xls')

var cells = WK.Sheets[WK.SheetNames[0]]
var rows = cells['!range']['e']['r']
for (x in cells){
	if (cells[x].v == 'Manufacturers.Mfr. Part Number'){
		key = x.slice(0,-1)
	}
}
for (i=2;i<=rows;i++){
	console.log(key+i)
	if (typeof cells[key+i] != 'undefined'){
		/* setTimeout(function(){
			getInfo('ms', cells[key + i]['v'])
			getInfo('dk', cells[key + i]['v'])
		}, 10000*(i-2)) */
		getInfo('nw', cells[key + i]['v'], i-2)
		getInfo('ms', cells[key + i]['v'], i-2)
		getInfo('dk', cells[key + i]['v'], i-2)
	}
}