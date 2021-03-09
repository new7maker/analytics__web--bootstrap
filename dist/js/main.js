$(".pricing__slider").slick({
    centerMode: true,
    centerPadding: "0px",
    arrows: false,
    dots: false,
    variableWidth: true,
    infinite: false,
    mobileFirst: true,
    initialSlide: 1,
    useTransforms: false,
    useCSS: false,
    responsive: [{
        breakpoint: 1200,
        settings: 'unslick'
    },

    {
        breakpoint: 730,
        settings: {
            dots: false
        }
    },

    {
        breakpoint: 0,
        settings: {
            dots: true
        }
    },

    ]
});

$('.menu-button').on('click', function() {
    $('.main-header__wrapper').toggleClass('active-menu')
})