//DataParser serves as single interface between the different parsers

function DataParser(name,callback){ 
	var self = this;
	
	//no parser?
	var name = (function(){
		if(typeof name == 'string' && callback){
			return name;
		}

		return 'GoogNGram.v2'
	})();

	//grab the file of the requested parser
	var Parser = require('./Parsers/'+name+'.js');

	this.parser = new Parser(callback);
}

DataParser.prototype.parse = function(txtfile){
	this.parser.parse('../test/'+txtfile);
}

module.exports = DataParser;

/////
/////
/////
