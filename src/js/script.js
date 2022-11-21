    //Слайдер (слик)
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
    //Табы переключение контента
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

    //Модальные окна появление/скрытие
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

/*валидация заполнения форм*/
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
/*маска ввода номера телефона*/
    $('input[name=phone]').mask("+7 (999) 999-99-99");
});
