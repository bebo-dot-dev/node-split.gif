var path = require('path');
var filemanager = require('../lib/filemanager.js')

// https://www.npmjs.com/package/gm
var gm = require('gm');

module.exports = {
	/**
	* gif -> jpg conversion via imageMagick
	*/
	convert: function (uploadedFilePath, callback) {
		var baseFilename = path.basename(uploadedFilePath.toLowerCase(), '.gif');
        var filename = 'output/' + baseFilename + '.jpg';

		filemanager.ensureDirectoryExists('output', function (dirError) {
			if (dirError) {
				callback(dirError, baseFilename);
			} else {
				gm(uploadedFilePath)
					.options({ imageMagick: true })
					.coalesce()
					.write(filename, function (error) {
					callback(error, baseFilename);
				});
			}
		});
	}
};