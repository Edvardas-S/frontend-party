var Header = (function (window) {

    function headerMobile() {
        var touch = $('.mobile-menu');
        var menu = $('.menu-container');
        $(touch).on('click', function (e) {
                e.preventDefault();
                touch.find('span').toggleClass('active');
                if (touch.find('span').hasClass('active')) {
                    menu.fadeIn();
                    $('body').css('overflow','hidden');
                } else {
                    menu.fadeOut()
                    $('body').css('overflow','auto');
                };
            }
        );
        if ($(window).width() < 992) {
            $('.menu-container a').on('click', function () {
                menu.fadeOut();
                $('.mobile-menu span').removeClass('active');
                $('body').css('overflow','auto');
            });
        }
    }

    function scrollWindow() {
        var headerHeight = $('header').height();
        $('.main-navigation').on('click', 'a[href^="#"]', function (e) {
            // target element id
            var id = $(this).attr('href');

            // target element
            var $id = $(id);
            if ($id.length === 0) {
                return;
            }

            e.preventDefault();

            // top position relative to the document
            var pos = $(id).offset().top - headerHeight;

            // animated top scrolling
            $('body, html').animate({scrollTop: pos});
        });

        $('.scroll-down').on('click', function (e) {
            e.preventDefault();
            $('body, html').animate({scrollTop: $(window).height()})
        })
    }

    function addSticky() {
        var homeH = $(window).height() - $('header').height();
        $(window).scroll(function () {
            if ($(this).scrollTop() >= homeH) { // this refers to window
                $('header').addClass('sticky');
            } else {
                $('header').removeClass('sticky');
            }
        });
    }

    return {
        headerMobile: headerMobile,
        scrollWindow: scrollWindow,
        addSticky: addSticky
    }
})(window);

Header.headerMobile();
Header.scrollWindow();
Header.addSticky();

