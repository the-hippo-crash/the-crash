'use strict';

(function($) {

    /**
     * Add event handlers for navigation links
     */
    $(document).ready(function() {
        $('[data-open-page]').on('click', function(e) {
            let page = $(e.target).attr('data-open-page');
            openPage(page);
        });
    });

})(jQuery);

/**
 * The page to open
 * @param {string} page The page to open
 */
function openPage(page) {
    $('[data-page]').hide();
    $('[data-page="' + page + '"').show();
}

function openHome() {
    const settings = require('electron-settings');

    settings.get('privateKey').then(value => {
        if (value) {
            console.log("Value true");
            var key;
            // Get the public key
            fs.read(value + '/public.key', key);

            // Show public key in text area
            $('#generate-key-pair-public').val(key);

            // Display file locations
            $('#generate-key-pair-path-private').text(value + '/private.key');
            $('#generate-key-pair-path-public').text(value + '/public.key');
            let home = 'generate-key--generated';
            openPage(home);
        }
        else {
            console.log("falsyfals");
            let home = 'start';
            openPage(home);
        }
    });

}
