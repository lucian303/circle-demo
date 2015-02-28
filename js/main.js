(function ($) {
    'use strict';

    var clicked = [], // stack to push/pull clicked squares to/from
        isInRollback = false,
        DELAY_TIME = 1000; // time to take between each box change on roll back

    function rollbackAnimation() {
        var index,
            box,
            delay = DELAY_TIME;

        isInRollback = true;

        for (index = clicked.length - 1; index >= 0; index--) {
            setTimeout(function () {
                var smallBox;

                box = $('#' + clicked.pop());
                box.removeClass('big-box-clicked');

                // If we reached the end, reset the small box color
                // and allow clicking again
                if (clicked.length === 0) {
                    smallBox = $('#stoplight');
                    smallBox.removeClass('small-box-stop');
                    smallBox.addClass('small-box-go');
                    isInRollback = false;
                }
            }, delay);

            delay += DELAY_TIME;
        }
    }

    /**
     * Check to see if we need to trigger the rollback and change
     * the small box color to red
     */
    function checkAndTriggerRollback() {
        var smallBox;

        // If all boxes have been clicked
        if (clicked.length === 7) {
            smallBox = $('#stoplight');
            smallBox.removeClass('small-box-go');
            smallBox.addClass('small-box-stop');
            rollbackAnimation();
        }
    }

    /**
     * Event handler that handles clicks on the big boxes
     */
    $('.big-box').on('click', function () {
        var box;

        if (!isInRollback) {
            box = $(this);
            if (!box.hasClass('big-box-clicked')) {
                clicked.push(box.attr('id'));
                box.addClass('big-box-clicked');
            }

            checkAndTriggerRollback();
        }
    });
}(jQuery));
