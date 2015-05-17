var DataCleaner = function () { };

var cleanValues = function (data) {
    for (var dataKey in data) {
		if (data.hasOwnProperty(dataKey) && data[dataKey] !== null) {
			data[dataKey] = data[dataKey].replace('\n', '');
			data[dataKey] = data[dataKey].trim();        
            if (dataKey === 'id') {
                data[dataKey] = data[dataKey].replace("'", '');
                data[dataKey] = data[dataKey].replace("/", '');
                data[dataKey] = encodeURIComponent(data[dataKey]);   
            }
		}
	}
	return data;
};

DataCleaner.prototype.clean = function(inData) {
    var outData = [];
    if (inData && inData.out) {
        for (var i = 0; i < inData.out.length; i++) {
            outData[i] = cleanValues(inData.out[i]);
        }
    }
	return outData;
};

module.exports = new DataCleaner();