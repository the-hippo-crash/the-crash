'use strict';

(function($) {

    $(document).ready(function() {
        $('form[data-form-load-key]').on('submit', function(e) {
            e.preventDefault();

            // Hide previous error messages.
            hideError();

            // Get the directory where the keys should be stored.
            let file = $('#load-key-pair-path').val();

            validateFile(file, function(err) {
                if(err) {
                    return showError(err);
                }
                // Load succeeded, open next page.
                openPage('sign-file');
            });
        });
    });

    /**
     * Make sure the given file can be used.
     * @param {string} file The path of the file to validate
     * @param {function} done callback
     */
    function validateFile(file, done) {
        // Make sure that the file exists.
        fs.stat(file, function(err, stat) {
            if(err) {
                return done('File does not exist');
            }
            if(!stat.isFile()) {
                return done('You should provide a file.');
            }

            // Make sure that the file actually is a private key.
            fs.readFile(file, function(err, data) {
                if(err) {
                    return done('Unable to read private key file.');
                }

                if(data.indexOf('RSA PRIVATE KEY') === -1) {
                    return done('The given file is not a private key.');
                }

                return done();
            });
        });
    }

    /**
     * Shows the error message
     * @param {String} text The error text to display
     */
    function showError(text) {
        $('#load-key-pair-error').text(text);
        $('#load-key-pair-error').show();
    }

    /**
     * Hides the error message
     */
    function hideError() {
        $('#load-key-pair-error').hide();
    }

    // Exit handler
    $(document).ready(function() {
        $('[data-load-key-pair-exit]').on('click', openHome);
    });

})(jQuery);