var fs = require('fs');

function CooccurenceTable(name){
	var self = this;

	this.name = name;

	//will save time on really matricies
	this.lastFill = [0,0];

	this.table = {

		rows : [],

		columns : []
	};
}

//logs an object representation of the table
CooccurenceTable.prototype.log = function(){
	console.log(this.table.columns);
	console.log("_____________________________");
	console.log(this.table.rows);
}


CooccurenceTable.prototype.createRow = function(element){
	//create row if it doesn't exist
	if(!CooccurenceTable.elementExist(this.table.rows,element)){
		this.table.rows.push({
			element : element,

			row : []
		})
	}
}

CooccurenceTable.prototype.createColumn = function(element){
	//create column if it doens't exist
	if(!CooccurenceTable.elementExist(this.table.columns,element)){
		this.table.columns.push({
			element: element,

			index : this.table.columns.length
		});
	}
}

CooccurenceTable.prototype.addValue = function(row,column,value){
	//perhps too slow. think of other solutions later
	var id = 0;

	//check all the columns for column and grab its index
	for (var i = 0; i < this.table.columns.length; i++) {
		var _column = this.table.columns[i];
		
		if(_column.element == column){
			id = _column.index;
			break;
		}
	};

	//check all the rows until we find the specified one
	for (var i = 0; i < this.table.rows.length; i++) {
		var _row = this.table.rows[i];

		if(_row.element == row){
			if(typeof _row.row[id] != 'number'){ //avoid NaN
			 	_row.row[id] = value;
			 }else{
			 	_row.row[id] += value;
			 }

			 break;

		}
	};
}

CooccurenceTable.prototype.fill = function(){ //RENAME
	//grab the length of each row
	var index = this.table.columns[this.table.columns.length-1].index;

	for (var i = this.table.rows.length-1; i >= 0;i--) {
		var row = this.table.rows[i].row;
		var rIndex = index;

		for (var j = rIndex; j>=0; j--) {
			
			if(!row[j]) row[j] = 0

			if(j==this.lastFill[0] && i ==this.lastFill[1]){
				return;
			}
		
		};
	};
}

CooccurenceTable.prototype.save = function(){
	var self = this;

		fs.writeFile( "../wordspaces/"+ self.name + ".json", JSON.stringify(self.table, null, 4), function(err){
			if(err) {
				console.log(err);
			} else {
				console.log("JSON saved to " + self.name + ".json");
			}
		})
	}

CooccurenceTable.elementExist = function(set,element){
	for (var i = 0; i < set.length; i++) {
		var vector = set[i];

		if(vector.element == element) return true
	};
	return false;
}

module.exports = CooccurenceTable