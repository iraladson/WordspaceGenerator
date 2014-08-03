//GOOGLE NGRAM PARSER v2
var fs = require('fs');
var CooccurenceTable = require('../CooccurenceTable.js');

function GoogNGram2Parser(callback){
	var self = this;
	this.callback = callback;

	this.parse = function(txtfile){
		fs.readFile(txtfile,'utf8',function(error,data){
		if(error, data){
			if(error) throw error
			var tables = [];

			var dataArray = self.filterDates(data);
			var ngrams = self.getNGrams(dataArray);
			
			GoogNGram2Parser.createWordxWordTable('5gram',ngrams,self.callback,function(gram){
				return gram.split("_")[0];
			});
		}
	});
	}
}

//
//@params@
//name: @String. Name of table
//ngrams: @ngram object array. [{ngram:[n1,n2,...nx], frequency: Number},...]
//notation: @String. Any special notation seperating words
GoogNGram2Parser.createWordxWordTable = function(name,ngrams,callback,func){
	var table = new CooccurenceTable(name);

	for (var i = 0; i < ngrams.length; i++) {
		var ngram = ngrams[i].ngram;
		var wordGram = GoogNGram2Parser.removePOS(ngram,func);

		var row = wordGram[0];
		var column = wordGram[wordGram.length-1];
		var frequency = ngrams[i].frequency;

		table.createRow(row);
		table.createColumn(column);
		table.addValue(row,column,frequency);
	};

	table.fill();

	callback(table);
}

GoogNGram2Parser.removePOS = function(ngram,func){
	var ngramArray = ngram.split(' ');
	var gram = [];

	for (var i = 0; i < ngramArray.length; i++) {
		gram.push(func(ngramArray[i]));
	};

	return gram;
}

GoogNGram2Parser.prototype.getNGrams = function(dataArray){
	var ngrams = [];
	var data = {};

	for (var i = 0; i < dataArray.length; i++) {
		var ngram = dataArray[i][0];

		//if there is not annotation, skip it
		if(ngram.indexOf('_N') == -1 && ngram.indexOf('_A') == -1 &&
			ngram.indexOf('_V') == -1 && ngram.indexOf('_D') == -1 &&
			ngram.indexOf('_C') == -1 && ngram.indexOf('_N') == -1) 
			continue //

		if(data[0] == ngram){
			ngrams[ngrams.length-1].frequency += parseInt(dataArray[i][2]);
		} else {
			data = dataArray[i];
			ngrams.push({ngram:data[0],frequency:parseInt(data[2])});
		}
	};

	return ngrams;
}

GoogNGram2Parser.prototype.getDependencyTrees = function(dataArray){
	var trees = [];
	var data = {};

}

GoogNGram2Parser.prototype.filterDates = function(data){
	var rawDataArray = data.split('\n');
	var dataArray = [];

	//remove all dates after 1995
	for (var i = 0; i < rawDataArray.length; i++) {
		var data = rawDataArray[i].split('\t');

		if(parseInt(data[1]) >= 1995){ //[1] is the date
			dataArray.push(data);
		}
	};

	return dataArray
}

var Parser = GoogNGram2Parser;
module.exports = Parser;