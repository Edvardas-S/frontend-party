var animations = (function (window) {
    function animations() {
        if (jQuery(window).width() > 992) {
            var animaEl = $('.anima-element');
            animaEl.css('opacity', 0).addClass('animated delay-3');

            animaEl.waypoint(function (dir) {
                if (dir === 'down') {
                    $(this).addClass('fadeIn').css('opacity', 1);
                }
            }, {offset: '95%'});
        }
    }

    return {
        init: animations
    }
})(window);

animations.init();
