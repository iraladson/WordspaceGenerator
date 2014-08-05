//DataParser serves as single interface for the different parsers

function DataParser(name,callback){ 
	var self = this;
	
	//no parser? default to googleV2 parser
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

DataParser.prototype.parse = function(wordspaceName,type,file){
	this.parser.parse(wordspaceName,type,'../'+file);
}

module.exports = DataParser;

/////
/////
/////
