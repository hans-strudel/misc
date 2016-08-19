var r = require('robotjs'),
	fs = require('fs'),
	hook = require('ll-keyboard-hook-win')
	
var first = true
	
var start = new Date().getTime()
var pause = 0
var count = 0

var keyCodes = {
	'9': 'tab',
	'13': 'enter',
	'86': 'v',
	'70': 'f',
	'40': 'down'
}

var fileHead = [
				"var r = require('robotjs')",
				"fs = require('fs')",
				"hook = require('ll-keyboard-hook-win')",
				"count = 0",
				"macro = function(i){"
				]

var lines = [],
	ends = []

function addMouseMove(){
	var ms = r.getMousePos()
	lines.push("r.moveMouse("+ms.x+","+ms.y+")")
}

function addMouseClick(type, dub){
	var type = type || 'left'
	var dub = dub || false
	lines.push("r.mouseClick('" + type + "'," + String(dub) + ")")
}

function addKeyTap(vkCode){
	console.log(vkCode)
	var key = keyCodes[vkCode]
	lines.push("r.keyTap('" + key + "')")
}

function addPause(pause){
	lines.push("setTimeout(function(){")
	ends.push("}, " + pause + ")")
}

function end(){
	var output = fileHead.join(',\r\n') + '\r\n'
	output += lines.join('\r\n') + '\r\n'
	output += "if (i < process.argv[2]) macro(count++)\r\nconsole.log('done')\r\nprocess.exit()\r\n"
	output += ends.join('\r\n') + '\r\n}' +
				'\r\nmacro(count)'
	fs.writeFileSync('tester.js', output)
	console.log('macro saved')
	hook.unbind()
}


hook.on('down', '*', function(ev){
	pause = new Date().getTime() - start
	addPause(pause)

	if (ev.vkCode == '104'){
		end()
	}
	if (ev.vkCode == '97'){
		addMouseMove()
		addMouseClick()
	} else if (ev.vkCode == '98'){
		addMouseMove()
		addMouseClick('left', true)
	} else if (ev.vkCode == '99'){
		addMouseMove()
		addMouseClick('right')
	} else {
		addKeyTap(ev.vkCode)
	}

	
	start = new Date().getTime()
})