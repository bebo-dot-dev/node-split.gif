/// <reference path="../typings/node/node.d.ts"/>
var express = require('express');
var router = express.Router();

var path = require('path');

var validator = require('../lib/validation.js')
var convertor = require('../lib/convertor.js')
var filemanager = require('../lib/filemanager.js')

//#region local functions
/**
 * a response render helper function for '/'
 */
function renderResponse(res, titleStr, validationFailMsg) {
  res.render('index',
    {
      result: titleStr ? ': ' + titleStr : '',
      validationFailMsg: validationFailMsg
    });
}
//#endregion


//#region express routing

/**
 * HTTP GET handler for /
 */
router.get('/', function (req, res, next) {
  renderResponse(res);
});

/**
 * HTTP GET handler for /samplegif
 */
router.get('/samplegif', function (req, res, next) {
  res.render('samplegif', { result: '' });
});

/**
 * HTTP POST file upload handler for /
 */
router.post('/', function (req, res) {
  try {
    var uploadedFile = req.files;

    validator.checkFileIsValid(uploadedFile, function (valid, uploadedFilePath, originalFilename) {
      if (valid) {
        try {
          convertor.convert(uploadedFilePath, function(error, baseFilename) {
            if (error) {
              console.log(error);
              filemanager.deleteFile(uploadedFilePath);
              renderResponse(res, "error", error);
            } else {
              filemanager.createZip(uploadedFilePath, function (zipFileName) {
                var targetZipFilename = path.basename(originalFilename.toLowerCase(), '.gif') + '.zip';
                res.download(zipFileName, targetZipFilename, function () {
                  filemanager.cleanUp(baseFilename);
                });
              });
            }
          });
        } catch (error) {
          filemanager.deleteFile(uploadedFilePath);
          renderResponse(res, "error", error);
        }
      }
      else {
        filemanager.deleteFile(uploadedFilePath);
        renderResponse(res, "bad file", "Bad file");
      }

    });
  } catch (error) {
    renderResponse(res, "error", error);
  }
});
//#endregion



module.exports = router;
