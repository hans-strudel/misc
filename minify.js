// auto minify to BASE64 for window.atob
fs = require('fs')
//console.log(process.argv)

var _FILE = process.argv[2]
if (typeof _FILE !== 'undefined'){
	fs.readFile(_FILE, 'utf8', function(err, data){
		if (err) return console.log(err)
		console.log(data.indexOf('//'))
		while (data.indexOf('\t') > -1){
			data = data.replace('\t', '')
		}
		console.log(data)
		
		b64 = new Buffer(data).toString('base64')
		out = 's=document.createElement(\'script\');s.innerHTML=\'eval(\\\'' + b64 
			  + '\\\')\';document.body.appendChild(s)'
		console.log('\n' + b64)
	
		newFile = process.argv[3] || _FILE.substr(0, _FILE.indexOf('.')) + 
				'-MIN' + _FILE.substring(_FILE.indexOf('.'), _FILE.length)
		fs.writeFile(newFile, out, function(err){
			if (err) return console.log(err)
			console.log('\nOutput: ' , newFile)
		})
	})
} else {
	console.log('\nNo File Specified')
}