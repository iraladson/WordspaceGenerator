var Wordspace = require('../src/Wordspace.js');

//Wordspace takes in 3 parameters
//1st param: a callback function that has the wordspace table as a parameter
//2nd param: a configuration object. {file: string filename, parser : string perser name}
//3rd param: optional boolean. default false. if true, wordspace.initialize() must be called manually
var wordspace = new Wordspace(function(table){
	table.log();
	table.save();
}, {file:'ngrams/sample',parser:'GoogNGram.v2'});