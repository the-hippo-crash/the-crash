'use strict';

(function($){

    /**
     * Attach event handlers.
     */
    $(document).ready(function() {
        // Attach event handlers for file pickers.
        $('input[type="text"][data-file-picker]').on('click', function(e) {
            pick(e, ['openFile']);
        });

        // And do the same for directory pickers.
        $('input[type="text"][data-directory-picker]').on('click', function(e) {
            pick(e, ['openDirectory']);
        });
    });

    /**
     * Opens a picker dialog
     * @param {object} e The event that triggered the opening of the dialog
     * @param {array} properties
     */
    function pick(e, properties) {
        var $target = $(e.target);

        const {dialog} = require('electron').remote;
        var dirs = dialog.showOpenDialog({properties: properties});

        // Maximum one dir could be selected, so set the path in the input field.
        if(dirs) {
            $target.val(dirs[0]);
        }
    }

})(jQuery);