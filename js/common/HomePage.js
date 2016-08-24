var HomePage = (function (window) {
    function loader() {
        $(window).load(function () {
            $(".loader-wrapper").delay(600).fadeOut();
            $(".loader").delay(800).fadeOut("slow");
        });
    }

    function parralaxScroll() {
        if ($(window).width() >= 992) {

            $(window).scroll(function () {

                var st = $(this).scrollTop();

                if ($(window).height() + 500 > $("header").height()) {
                    $("section.home .parralax").css({
                        "transform": "translate3d(0px, " + st / 18 + "%, 0px)",
                        "-webkit-transform": "translate3d(0px, " + st / 18 + "%, 0px)",
                        "opacity": "1" - st / 700
                    });
                }
                ;

            });
        }
    }

    return {
        loader: loader,
        parralaxScroll: parralaxScroll
    }

})(window);

HomePage.loader();
HomePage.parralaxScroll();

