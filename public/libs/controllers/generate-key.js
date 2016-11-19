'use strict';

const async = require('async'),
    fs = require('fs');

// @TODO Bugfix: existing keys will now be overwritten.
// @TODO: Key files should be stored with the right permissions.

(function ($) {
    /**
     * Add event listener for form submission
     */
    $(document).ready(function () {
        const settings = require('electron-settings');

        $('form[data-form-generate-key]').on('submit', function (e) {
            e.preventDefault();

            // Hide previous error messages.
            hideError();

            // Get the directory where the keys should be stored.
            let dir = $('#generate-key-pair-path').val();

            // Make sure that the directory exists.
            fs.stat(dir, function (err, stat) {
                if (err) {
                    return showError('Directory does not exist');
                }

                if (!stat.isDirectory()) {
                    return showError('Given path is not a directory');
                }

                generateKeyPair(dir, function (err) {
                    if (err) {
                        return showError(err);
                    }

                    // Show public key in text area
                    $('#generate-key-pair-public').val(encryption.getPublicKey(true));

                    // Display file locations
                    $('#generate-key-pair-path-private').text(dir + '/private.key');
                    $('#generate-key-pair-path-public').text(dir + '/public.key');

                    settings.has("private.location").then(exists => {
                        if (exists === false) {
                            settings.set('private', {
                                location: dir + '/private.key'
                            });
                        }
                    });
                    openPage('generate-key--generated');
                });
            });
        });
    });

    /**
     * Generates the key pair
     * @param {string} path The path to the dir that will store the key pair.
     * @param {function} done Callback.
     */
    function generateKeyPair(path, done) {
        // Generate a new key pair.
        window.encryption.generateKeyPair();

        // Save the keys to the filesystem.
        async.series([
            function (cb) {
                encryption.savePrivateKey(path + '/private.key', cb);
            },
            function (cb) {
                encryption.savePublicKey(path + '/public.key', cb);
            }
        ], done);
    }

    /**
     * Shows the error message
     * @param {String} text The error text to display
     */
    function showError(text) {
        $('#generate-key-pair-error').text(text);
        $('#generate-key-pair-error').show();
    }

    /**
     * Hides the error message
     */
    function hideError() {
        $('#generate-key-pair-error').hide();
    }

    // Exit handler
    $(document).ready(function () {
        $('[data-generate-key-pair-exit]').on('click', openHome);
    });


})(jQuery);