// https://www.npmjs.com/package/mmmagic
var mmm = require('mmmagic'),
  Magic = mmm.Magic;
 
/**
* uploaded file validation
*/
module.exports = {
  checkFileIsValid: function (file, callback) {
    //does it look like a GIF file?
    var fileLooksValid = (
      (file['gif-File'].fieldname == 'gif-File') &&
      (file['gif-File'].mimetype == 'image/gif') &&
      (file['gif-File'].extension.toLowerCase() == 'gif')
      );

    if (fileLooksValid) {
      //actual file type detection
      var magic = new Magic(mmm.MAGIC_MIME_TYPE);
      magic.detectFile(file['gif-File'].path, function (err, detectedMime) {
        if (err) {
          console.log(err);
          callback(false, file['gif-File'].path);
        }
        else {
          var fileIsValid = (detectedMime == 'image/gif');
          callback(
            fileIsValid,
            file['gif-File'].path,
            file['gif-File'].originalname);
        }
      });
    }
    else
      callback(false, file['gif-File'].path);
  }
};