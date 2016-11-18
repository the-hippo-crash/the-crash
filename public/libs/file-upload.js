(function(){
    $( document ).ready(function(){
        const {dialog} = require('electron').remote;
        const fs = require('fs'); // Load the File System to execute our common tasks (CRUD)


        var fileUploader = new FileUploader();

        // Trigger file input on button click
        $( '#upload-file-button' ).on('click', function () {
            console.log("YOLO");
            dialog.showOpenDialog({ filters: [
                { name: 'PDF', extensions: ['pdf', 'PDF'] }
            ]},function (fileNames) {
                if (fileNames === undefined) return;
                    var fileName = fileNames[0];
                    fs.readFile(fileName, 'utf-8', function (err, data) {
                        $( '#preview' ).text( data );
                });
            });
        } );

        // When user selects a file
        $( '#upload-file' ).on( 'change', function () {
            fileUploader.uploadFile( this );
        })
    });
})();

/** This class handles file uploads **/
var FileUploader = function () {


    // Save the file to the hdd
    function uploadFile( caller ){
        var files = $(caller).get(0).files;

        if (files.length > 0){
            // One or more files selected, process the file upload

            // create a FormData object which will be sent as the data payload in the
            // AJAX request
            var formData = new FormData();

            // loop through all the selected files
            for (var i = 0; i < files.length; i++) {
                var file = files[i];

                // add the files to formData object for the data payload
                formData.append('uploads[]', file, file.name);
            }
        }
    }

    function checkIfFileExists(){
        //TODO: implement
        return false;
    }

};