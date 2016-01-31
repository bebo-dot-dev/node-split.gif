var fs = require('fs');
var path = require('path');

// https://www.npmjs.com/package/archiver
var archiver = require('archiver');

var self = module.exports = {
  
  /**
  * zip archive creation
  */
  createZip: function (uploadedFilePath, callback) {
    
    self.deleteFile(uploadedFilePath);
    
    var baseFilename = path.basename(uploadedFilePath.toLowerCase(), '.gif');

    var zipFileName = 'output/' + baseFilename + '.zip';
    var archive = archiver('zip');
    var output = fs.createWriteStream(zipFileName);

    output.on('close', function () {
      console.log(archive.pointer() + ' total bytes');
      console.log('archiver has been finalized and the output file descriptor has closed.');
      callback(zipFileName);
    });

    archive.on('error', function (err) {
      console.log(err);
    });

    archive.pipe(output);

    var files = fs.readdirSync('output/');
    for (var index = 0; index < files.length; index++) {
      var fileName = files[index];
      var fileExt = path.extname(fileName).toLowerCase();
      if ((fileName.indexOf(baseFilename) === 0) && (fileExt === '.jpg')) {
        archive.file('output/' + fileName, { name: fileName });
      }
    }

    archive.finalize();
  },
  
  /**
  * post-conversion working area cleanup
  */
  cleanUp: function (baseFilename) {
    fs.readdir('output/', function (err, files) {
      if (err) {
        console.log(err);
      }
      else {
        files.forEach(function (fileName) {
          if (fileName.indexOf(baseFilename) === 0) {
            self.deleteFile('output/' + fileName);
          }
        }, this);
      }
    });
  },
  
  /**
  * simply a wrapper around fs.unlinkSync with a reasonable name
  */
  deleteFile: function(file){
    fs.unlinkSync(file);
  },
  
  /**
  * a wrapper around fs.mkdir that can be called to ensure a directory exists
  */
  ensureDirectoryExists: function(path, mask, callback) {    
    if (typeof mask == 'function') { // allow the `mask` parameter to be optional
        callback = mask;
        mask = 484;
    }
    fs.mkdir(path, mask, function(err) {
        if (err) {
            if (err.code == 'EEXIST') callback(null); // ignore the error if the folder already exists
            else callback(err); // something else went wrong
        } else callback(null); // successfully created folder
    });
  }
  
};