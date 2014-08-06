var Wordspace = require('../src/Wordspace.js');

//var posDependConfig = {name:'posDepend',file:'test/posDependency',type:'posDependency',parser:'GoogNGram.v2'};
var wordGramConfig = {name:'5gram',file:'ngrams/sample',type:'wordGram',parser:'GoogNGram.v2'}

//Wordspace() takes 3 parameters
//1st param: a callback function that has the wordspace table as a parameter
//2nd param: a configuration object. {file: string filename, parser : string perser name}
//3rd param: optional boolean. default false. if true, wordspace.initialize() must be called manually
var wordspace = new Wordspace(wordGramConfig,function(table){
	table.log();
	table.save();
});