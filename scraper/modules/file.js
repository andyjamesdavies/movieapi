var fs = require('fs');

var File = function () {};

File.prototype.read = function (filename, callback) {
	fs.readFile(filename, 'utf8', function (err, readData) {
		if (err) {
			console.log(err);
		} else {
			var data = JSON.parse(readData);
			callback.call(this, data);
		}
	});
};

File.prototype.readSync = function (filename) {
    return fs.readFileSync(filename, "utf8");
};

File.prototype.write = function(filename, response) {
	fs.writeFile(filename, JSON.stringify(response), function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log(filename + ' saved');
		}
	});
};

File.prototype.writeSync = function (filename, data) {
    return fs.writeFileSync(filename, data);
};

module.exports = new File();