'use strict';

let Signer = require('../../libs/signer');

(function ($) {
  $(document).ready(function () {
    var signer = new Signer();

    $('form[data-form-sign-file]').on('submit', function(e) {
      hideError();
      e.preventDefault();
      let fileName = $('#load-file-path').val();
      console.log(fileName);
      signer.signFile(fileName, null, (err, signature) => {
        if (err) {
          showError(err)
        }
        $( '#signature' ).val(signature);
      });
    });

    /**
     * Shows the error message
     * @param {String} text The error text to display
     */
    function showError(text) {
      $('#load-key-error').text(text).show();
    }

    /**
     * Hides the error message
     */
    function hideError() {
      $('#load-key-error').hide();
    }
  });
})(jQuery);