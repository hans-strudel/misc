var Grid = {}

Grid.init = function(){
	Grid.tileSize = 5;
	Grid.canvas = document.getElementById("canvas");
	Grid.ctx = Grid.canvas.getContext("2d");
	Grid.width = Grid.canvas.width;
	Grid.height = Grid.canvas.height;
	
	Grid.drawGrid = function(c){
		for (var i = 0; i <= Grid.width; i += Grid.tileSize){
			Grid.ctx.moveTo(i,0);
			Grid.ctx.lineTo(i,Grid.height);
			Grid.ctx.stroke();
			for (var j = 0; j <= Grid.height; j += Grid.tileSize){
				Grid.ctx.moveTo(i,j);
				Grid.ctx.lineTo(Grid.width,j);
				Grid.ctx.stroke();
			}
		}
	}
	
	//Grid.drawGrid();
	
	Grid.drawTile = function(x,y,tile){
		var sz = (tile || {}).size || Grid.tileSize;
		Grid.ctx.fillStyle = (tile || {}).color || 'white';
		Grid.ctx.fillRect(x, y, sz, sz);
	}
	
	Grid.drawMap = function(map){
		for (var i = 0; i <= Grid.width; i += Grid.tileSize){
			for (var j = 0; j <= Grid.height; j += Grid.tileSize){
				Grid.drawTile(i,j,map(i,j))
			}
		}
	}

	function map1(x,y){
		var wall = {
			color: 'black'
		}
		var chest = {
			color: 'red',
			size: 10
		}
		//console.log(x, y, Grid.width, Grid.height);
		if (x == 0 || y == 0) return wall;
		if (x >= Grid.width-Grid.tileSize || y >= Grid.height-Grid.tileSize) return wall;
		//if (x % y == 0) return chest;
		return {color: '#' + (Math.random()*(1<<24)|0).toString(16), size: x%y*10}
	}
	Grid.drawMap(map1);
		
	Grid.canvas.addEventListener('mousewheel',function(event){
		console.log(event);
		if (event.deltaY < 0){
			Grid.tileSize -= 1;
			Grid.drawMap(map1);
		}
		if (event.deltaY > 0){
			Grid.tileSize += 1;
			Grid.drawMap(map1);
		}
		return false; 
	}, false);
}

Grid.init();

