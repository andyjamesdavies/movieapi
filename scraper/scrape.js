var scrape = require(__dirname + '/modules/scraper.js');

//var config = {
//    recipePath: __dirname + "/recipes/recipe1.json",
//    seedDataPath: __dirname + "/recipes/seedData.json"
//};
//
//scrape.withSeed(config.recipePath, config.seedDataPath);

var config = {
    recipePath: __dirname + "/recipes/recipe0.json",
    pageRange: {
        min: 1,
        max: 256
    }
};

scrape.withPageRange(config.recipePath, config.pageRange);