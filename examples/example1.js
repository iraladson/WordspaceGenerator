var Wordspace = require('../src/Wordspace.js');

var wordGramConfig = {name:'sample5gram',file:'ngrams/sample',type:'wordGram',parser:'GoogNGram.v2'}

var wordspace = new Wordspace(wordGramConfig, function(table){
	table.log();
	table.save();
});