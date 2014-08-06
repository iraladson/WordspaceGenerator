WordspaceGenerator
==================

Generate wordspaces (frequency matrices for words) that contains useful functions. Useful for nlp


Once `var Wordspace = require([path to src/Wordspace.js]);` is included in the file, the wordspace can be instantiated with `new Wordspace(config,callback)`.

`config` is a configuration object.

```javascript
{
	//the name of the wordspace and the json output file
	name : [String],

	//the path of the ngram file
	file : [String],

	//tells parser how to extract data (i will add 'wordPosGram' and 'posDependency' soon)
	type : ['wordGram'/'posGram'/'posDependency'],

	//specifies the parser to be used. 
	//right now it only has the "GoogNGram.v2" parser, but it's easy to add more (aka wikipedia??)
	parser : 'GoogNGram.v2'
}
```

`callback` is the callback function. It has a `table` parameter, which as of now has two functions: 

`table.view()` logs the table on the console
`table.save()` saves a json file of the table. It's name will be what was specified in the configuration object

WARNING: I have not yet added a `table.load()` function, so be sure not to overwrite the json file after you make it!! If Gil is reading this, give me a call and we can talk out the best strategy for making the wordspaces
