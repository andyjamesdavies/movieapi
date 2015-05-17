var file = require('./modules/file.js');
var scraper = require('./modules/scraper.js');
var recipe1 = "./recipes/recipe1.json";
var pages = JSON.parse(file.readSync("./recipes/seedData.json"));
var i = 0;
var timeout = 1000;
var keys = Object.keys(pages);

var tick = function () {
    var key = keys[i];
    
	scraper.scrape(key, pages[key], recipe1);

	i++;
    timeout = (Math.floor(Math.random() * 4) + 1)*1000;

	if (i < keys.length) {
        setTimeout(tick, timeout);
	}
};

setTimeout(tick, timeout);