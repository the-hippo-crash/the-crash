(function () {
    let Encryption = require('Encryption');

    $(document).ready(function () {
        var encryption = new Encryption();

        $('#upload-pdf-file-button-js').on('click', function () {
            //TODO: implement
        });

        $('#create-hash-button-js').on('click', function () {
            //TODO: implement
        });

        $('#generate-keys-button-js').on('click', function () {
            var keyPair = encryption.generateKeyPair();
            alert("Generated keypair :) ");
        });
    });
})();