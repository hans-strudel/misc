matrix = function(r,c,f){
	r = r || 0;
	c = c || 0;
	f = f || 0;
	var m = [];
	
	for (var i = 0; i < r; i++){
		m.push((new Array(c)).fill(f));
	};
	
	m.rows = function(j){
		if (typeof j === 'number'){
			return this[j];
		}
		return this.length;
	};
	
	m.columns = function(j){
		if (typeof j === 'number'){
			if (j > (this[0] || []).length) throw new Error("Out of range");
			var tmp = [];
			this.forEach(function(e){
				tmp.push(e[j]);
			});
			return tmp;
		}
		return (this[0] || []).length;
	};
	
	m.dim = function(m,n,f){
		m = m || this.length;
		n = n || this[0].length;
		f = f || ()=>{return 0};
		this.length = m;
		
		for (var i = 0; i < this.length; i++){
			(typeof this[i] == 'object')?this[i].length = n:this[i] = (new Array(n)).fill(f);
			for (var j = 0; j < this[i].length;j++){
				this[i][j] = this[i][j] || f(i, j);
			}
		}
		
		return this;
		
	}
	
	m.fill = function(n){
		var ar = this;
		ar.forEach(function(row,i){
			for (var j = 0; j < row.length; j++){
				ar[i][j] = (typeof n == 'function') ? n(i,j,ar[i][j]) : n;
			}
		})
		return ar;
	};
	
	m.map = function(n){
		this.forEach(function(row, ind, mat){
			row.forEach(function(cell, index, col){
				n(cell, index, col, m.columns(index));
			})
		})
	}
	
	return m;
}

var x = new matrix(7,6);

console.log(x.fill(4));
console.log(x.rows())
console.log(x.rows(3))
console.log(x.rows(9))
console.log(x.columns())
console.log(x.columns(4))
//console.log(x.columns(9))
