(function () {
    let Encryption = require('Encryption');

    $(document).ready(function () {
        var encryption = new Encryption();

        // Trigger file input on button click
        $('#upload-pdf-file-button-js').on('click', function () {
            //TODO: implement
        });

        // Trigger file input on button click
        $('#create-hash-button-js').on('click', function () {
            //TODO: implement
        });

        // Trigger file input on button click
        $('#generate-keys-button-js').on('click', function () {
            var keyPair = encryption.generateKeyPair();
            alert("Generated keypair :) ");
        });

        $( '' );
    });
})();