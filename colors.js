color = function(r,g,b){
	if ((r || '').match(/#[a-f|A-F|0-9]{6}$/)){
		this.r = parseInt(r.slice(1,3), 16);
		this.g = parseInt(r.slice(3,5), 16);
		this.b = parseInt(r.slice(5,7), 16);
	} else if (typeof r == 'string') {
		throw new Error('Incorrect Hex Value: ' + r);
	} else {
		this.r = r || 0;
		this.g = g || 0;
		this.b = b || 0;
	}

	this.toHex = function(){
		var hex = '#';
		
		hex += ('0' + this.r.toString(16)).slice(-2);
		hex += ('0' + this.g.toString(16)).slice(-2);
		hex += ('0' + this.b.toString(16)).slice(-2);
		
		return hex;
	}
	// this._hex = this.toHex();
	
	this.toRgb = function(){
		var rgb = 'rgb(';
		
		rgb += this.r + ', ' + this.g + ', ' + this.b + ')';
		
		return rgb;
	}
	
	return this;
}