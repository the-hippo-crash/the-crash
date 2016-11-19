'use strict';

(function($){

    /**
     * Attach event handlers.
     */
    $(document).ready(function() {
        $('input[type="text"][data-directory-picker]').on('click', function(e) {
            var $target = $(e.target);

            const {dialog} = require('electron').remote;
            var dirs = dialog.showOpenDialog({properties: ['openDirectory']});

            // Only one dir could be selected, so set the path in the input field.
            $target.val(dirs[0]);
        })
    });

})(jQuery);