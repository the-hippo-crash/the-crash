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

}
