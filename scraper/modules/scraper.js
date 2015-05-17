var skrap = require('skrap');
var file = require('./file.js');
var dataCleaner = require('./dataCleaner.js');

var Scraper = function () { };

Scraper.prototype.scrape = function (key, url, recipe) {
    file.read(recipe, function(rdata) {
        
		rdata.url = url;
		file.writeSync(recipe, JSON.stringify(rdata));

		skrap(recipe, {}, function(outData) {
            var tmp = dataCleaner.clean(outData);
			file.write('data/' + key + '.json', tmp);
		});
	});
};

module.exports = new Scraper();