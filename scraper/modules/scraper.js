var skrap = require('skrap');
var file = require(__dirname + '/file.js');
var dataCleaner = require(__dirname + '/dataCleaner.js');

var scrape = function (key, url, recipe) {
    file.read(recipe, function(rdata) {
        
		rdata.url = url;
		file.writeSync(recipe, JSON.stringify(rdata));

		skrap(recipe, {}, function(outData) {
            var tmp = dataCleaner.clean(outData);
			file.write(__dirname + '/../data/' + key + '.json', tmp);
		});
	});
};

exports.withSeed = function (recipe, seedData) {
    var pages = JSON.parse(file.readSync(seedData));
    var i = 0;
    var timeout = 1000;
    var keys = Object.keys(pages);
    
    var tick = function () {
        var key = keys[i];
    
        scrape(key, pages[key], recipe);
    
        i++;
        timeout = (Math.floor(Math.random() * 4) + 1) * 1000;
    
        if (i < keys.length) {
            setTimeout(tick, timeout);
        }
    };
    
    setTimeout(tick, timeout);
};

exports.withPageRange = function (recipe, pageRange) {
    var i = pageRange.min;
    var timeout = 1000;
    
    var tick = function () {
        var key = Number(i);
        skrap(recipe, { pageNum: i }, function(outData) {
            var tmp = dataCleaner.clean(outData);
			file.write(__dirname + '/../data/' + key + '.json', tmp);
		});
    
        i++;
        timeout = (Math.floor(Math.random() * 4) + 1) * 1000;
    
        if (i <= pageRange.max) {
            setTimeout(tick, timeout);
        }
    };
    
    setTimeout(tick, timeout);
};