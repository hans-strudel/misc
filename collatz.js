function step(n){
	return (n%2==0) ? (n/2) : (3*n+1);
}
function step2(n){
	return (n%2==0) ? (n/2) : ((3*n+1)/2);
}
function step3(n){
	if (n%2 != 0) n = 3*n+1;
	var m = Math.floor(Math.log2(n));
	for (m; m > 0; m--){
		if (n%Math.pow(2,m) == 0) return n/Math.pow(2,m);
	}
}

var n = 19288122379;

var start = Date.now();

while (n != 1){
	console.log(n);
	n = step3(n);
}

console.log(Date.now() - start + "ms");