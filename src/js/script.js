$(document).ready(function(){
    $('.slider__inner').slick({
        lazyLoad: 'ondemand',
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        focusOnSelect: true,
        prevArrow:'<button type="button" class="slick-prev"><img src="icons/arrow_left.svg"></button>',
        nextArrow:'<button type="button" class="slick-next"><img src="icons/arrow_right.svg"></button>',
        responsive:[
            {
                breakpoint: 992,
                settings: {
                    arrows: false,
                }
            }
        ]
        });
});
