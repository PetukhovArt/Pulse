    //Slick Slider
$(document).ready(function(){
    $('.slider__inner').slick({
        lazyLoad: 'ondemand',
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        focusOnSelect: true,
        prevArrow:'<button aria-label="sliderArrow" type="button" class="slick-prev"><img alt="arrow" src="icons/arrow_left.svg"></button>',
        nextArrow:'<button aria-label="sliderArrow" type="button" class="slick-next"><img alt="arrow" src="icons/arrow_right.svg"></button>',
        responsive:[
            {
                breakpoint: 992,
                settings: {
                    arrows: false,
                }
            }
        ]
        });
    //tabs
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });
    //Описание итема в каталоге появление/скрытие
    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        })
    };
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //modal windows
    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });

    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });

    $('.button_catalog').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        })
    });

//validation forms
    function valideForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 10
                },
                phone: {
                    required: true,
                    minlength: 12
                },
                email: {
                    required: true,
                    minlength: 5,
                    email: true
                }
            },
            messages: {
                name: 'Введите ваше ФИО',
                phone: {
                    required: 'Введите ваш номер',
                    minlength: jQuery.validator.format('Введите {12} цифр!')
                },
                email: 'Введите почту в формате name@domain.com'
            }
        });
    };

    valideForms('#consultation form');
    valideForms('#consultation-form');
    valideForms('#order form');
//phone mask
    $('input[name=phone]').mask("+7 (999) 999-99-99");

//email receive (ajax(php))
    $('form').submit(function(e) {
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        }

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('#thanks').fadeIn('slow');
            $('form').trigger('reset');
        });
        return false;
    });

//Smooth scroll and page up
    $(window).scroll(function(){
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href^=#up]").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });
});
