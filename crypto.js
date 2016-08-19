sumChars = function(str){
	var charSum = 0;
	str.split('').forEach(function(c){
		charSum += c.charCodeAt();
	});
	return charSum;
}


encrypt = function(str, key){
	var base = sumChars(str),
		exp = sumChars(key);
		
	var en = Math.pow(base/exp, exp);
	return en;
}

decrypt = function(str, key){
	var base = parseFloat(str),
		exp = sumChars(key);
	var de = Math.pow(base, 1/exp) * exp;
	return String.fromCharCode(de);
}

x = encrypt('hey', 's')
console.log(x);
y = decrypt(x, 's');
console.log(y);