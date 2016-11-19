'use strict';

(function ($) {

    /**
     * Add event handlers for navigation links
     */
    $(document).ready(function () {
        $('[data-open-page]').on('click', function (e) {
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
    settings.has("private.location").then(exists => {
        if (exists) {
            settings.get('private.location').then(result => {
                encryption.loadKey(result, 'pkcs1-private', function () {
                    // When done loading key move to next page
                    console.log('opening page');
                    openPage('load-key');
                })
            });
        }
    });
    openPage('start');
}
