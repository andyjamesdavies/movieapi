var file = require(__dirname + '/file.js'),
	exec = require('child_process').exec,
	interval = 1000,
    filePath = __dirname + '/../data/{{ID}}.json',
    range = {
        min: 1,
        max: 256  
    };
 
function getFilePath(id) {
    return filePath.replace('{{ID}}', id);
};

function parseFile(filePath) {
    var data = JSON.parse(file.readSync(filePath)),
        out = {
            data: []
        };
    
    for (var i = 0; i < data.length; i++) {
        name = data[i].name;
        out.data.push(name);
    }
    return out;
};
   
function encodeData(data) {
	data = JSON.stringify(data);
	return data.replace(/'/g, "&#39;");
}

module.exports = function () {
    var i = range.min,
        interval = 1000;
    
    var intId = setInterval(function () {
        var filePath = getFilePath(i);
        var data = parseFile(filePath);
    
		exec("curl -X PUT http://localhost:5984/movies_netflix_uk/" + i + " -d '" + encodeData(data) + "'", function (error, stdout, stderr) {
			if (error) {
				file.writeFileSync('ERROR.json', encodeData(data));
				console.log('ERR: ' + error);
			} else {
				console.log(stdout);
			}
		});
    
    	if (i >= range.max) {
    		clearInterval(intId);
    	}
    	i++;
    }, interval);
};