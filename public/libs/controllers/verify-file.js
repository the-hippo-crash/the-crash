'use strict';

//let async = require('async');

(function($) {

    /**
     * Add submit handler for file validation
     */
    $(document).ready(function() {
        $('form[data-form-verify-file]').on('submit', function (e) {
            e.preventDefault();

            // Hide previous errors.
            hideError();

            // Get the public key file
            let publicKey = $('#verify-file-public-key').val();

            // Get the given path to the file to verify
            let verificationFile = $('#verify-file-verification-file').val();

            // Get the signature to use in the verification
            let signature = $('#verify-file-signature').val();

            // Make sure that the verification file exists and is actually a file.
            validateFile(verificationFile, function (err) {
                if(err) {
                    return showError(err);
                }

                // Do the actual signature verification.
                if(encryption.verifyWithByPublicKeyString(verificationFile, signature, publicKey)) {
                    // File is valid
                    console.log('VALID FILE');
                }
                else {
                    // File is not valid
                    console.log('INVALID FILE');
                }
            });
        });
    });

    /**
     * Make sure that the given file exists and is actually a file.
     * @param {String} file The path to the file to verify.
     * @param {function} done Callback
     */
    function validateFile(file, done) {
        // Make sure that the file exists.
        fs.stat(file, function(err, stat) {
            if(err) {
                return done('File does not exist');
            }
            if(!stat.isFile()) {
                return done('You did not provide a valid file.');
            }

            return done();
        });
    }

    /**
     * Shows the error message
     * @param {String} text The error text to display
     */
    function showError(text) {
        $('#verify-file-error').text(text);
        $('#verify-file-error').show();
    }

    /**
     * Hides the error message
     */
    function hideError() {
        $('#verify-file-error').hide();
    }

})(jQuery);
