var fs = require('fs');
var DataParser = require('./DataParser.js');

//params
//config => Object. ['file'] = the name of the txt ngram file
//callback => callback function f(p). p is the frequency table  
function Wordspace(callback,config,hold){

	//check for callback
	if(typeof callback != 'function'){
		console.log("Must have callback function as 1st parameter")
	}

	//Create data parser
	if(config.parser){
		this.parser = new DataParser(config.parser,callback);
	} else {
		this.parser = new DataParser(callback);
	}

	//initialize if config has file
	if(!hold) this.initialize(config.file);
}

Wordspace.prototype.initialize = function(txtfile){
	this.parser.parse(txtfile);

;}

module.exports = Wordspace;