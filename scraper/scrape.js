var skrap = require('skrap'),
	fs = require('fs'),
	recipe1 = "./recipes/recipe1.json";

var pages = {
    'nicolasCage': 'http://www.imdb.com/name/nm0000115/'  
};


//writes api response into a file
var writeFile = function(filename, response, args) {
	fs.writeFile(filename, JSON.stringify(response), function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log(filename + ' saved');
		}
	});
};

var readFile = function (filename, callback) {
	fs.readFile(filename, 'utf8', function (err, readData) {
		if (err) {
			console.log(err);
		} else {
			var data = JSON.parse(readData);
			callback.call(this, data);
		}
	});
};

var cleanValues = function (objdata) {
    for (var dataKey in objdata) {
		if (objdata.hasOwnProperty(dataKey) && objdata[dataKey] !== null) {
			objdata[dataKey] = objdata[dataKey].replace('\n', '');
			objdata[dataKey] = objdata[dataKey].trim();        
            if (dataKey === 'id') {
                objdata[dataKey] = objdata[dataKey].replace("'", '');
                objdata[dataKey] = objdata[dataKey].replace("/", '');
                objdata[dataKey] = encodeURIComponent(objdata[dataKey]);   
            }
		}
	}
	return objdata;
};

var cleanData = function(inData) {
    var out = [];
    if (inData && inData.out) {
        for (var i = 0; i < inData.out.length; i++) {
            out[i] = cleanValues(inData.out[i]);
        }
    }
	return out;
};

var scrape = function (key, url, recipe) {
    readFile(recipe, function(rdata) {
		rdata.url = url;

		fs.writeFileSync(recipe, JSON.stringify(rdata));

		skrap(recipe, {}, function(outData) {
            var tmp = cleanData(outData);
			writeFile('data/' + key + '.json', tmp);
		});
	});
};

var i = 0,
	interval = 3,
    keys = Object.keys(pages);

var intId = setInterval(function () {

    var key = keys[i];
    
	scrape(key, pages[key], recipe1);

	i++;
	interval = (Math.floor(Math.random() * 4) + 1)*1000;

	if (i >= keys.length) {
		clearInterval(intId);
	}
}, interval);
