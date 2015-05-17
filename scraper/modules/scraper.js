var skrap = require('skrap');
var file = require(__dirname + '/file.js');
var dataCleaner = require(__dirname + '/dataCleaner.js');

module.exports = function (key, url, recipe) {
    file.read(recipe, function(rdata) {
        
		rdata.url = url;
		file.writeSync(recipe, JSON.stringify(rdata));

		skrap(recipe, {}, function(outData) {
            var tmp = dataCleaner.clean(outData);
			file.write(__dirname + '/../data/' + key + '.json', tmp);
		});
	});
};