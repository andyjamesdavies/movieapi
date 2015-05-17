var file = require(__dirname + '/modules/file.js');
var scrape = require(__dirname + '/modules/scraper.js');
var recipe1 = __dirname + "/recipes/recipe1.json";
var pages = JSON.parse(file.readSync(__dirname + "/recipes/seedData.json"));

var i = 0;
var timeout = 1000;
var keys = Object.keys(pages);

var tick = function () {
    var key = keys[i];

    scrape(key, pages[key], recipe1);

    i++;
    timeout = (Math.floor(Math.random() * 4) + 1) * 1000;

    if (i < keys.length) {
        setTimeout(tick, timeout);
    }
};

setTimeout(tick, timeout);