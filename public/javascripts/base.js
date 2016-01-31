/// <reference path="../../typings/jquery/jquery.d.ts"/>
$(document).on('change', '.btn-file :file', function () {
    var input = $(this),
        numFiles = input.get(0).files ? input.get(0).files.length : 1,
        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    input.trigger('fileselect', [numFiles, label]);
});

$('.btn-file :file').on('fileselect', function (event, numFiles, label) {
    console.log(numFiles);
    console.log(label);
    $(this).closest('form').submit();
});

$(function () {
  $('[data-toggle=tooltip]').tooltip({
    'delay': { 'show': 100, 'hide': 200 }
  });
});