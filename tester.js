genPrimes = function(n){
	var primes = []
	for (x=1;x<n+1;x++){
		(isPrime(2*x-1)) ? primes.push(2*x-1) : n++
	}
	return primes
}

isPrime = function(n){
	if (n%2==0) return false
	for (i=3;i<n;i+=2){
		if (n%i == 0) return false
	}
	return true
}

