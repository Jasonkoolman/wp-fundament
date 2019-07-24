initQuantityButtons();
initAccordion();

if ($(document.body).hasClass('template-template-home')) {
    initStickyHeader();
    initScrollReveal();
}

function initScrollReveal() {
    ScrollReveal().reveal('.app-hero .col:first-child > *', {
        delay: 400,
        duration: 1400,
        scale: 0.8,
        opacity: 0,
        interval: 200,
        cleanup: true
    });

    ScrollReveal().reveal('.app-hero .col img', {
        duration: 1400,
        origin: 'right',
        distance: '100px',
        easing: 'cubic-bezier(0.4, 0.2, 0.2, 1)',
        opacity: 0,
        cleanup: true
    });

    ScrollReveal().reveal('.home-feature', {
        duration: 1400,
        distance: '80px',
        opacity: 0,
        interval: 200,
        viewFactor: 0.5,
        cleanup: true
    });

    ScrollReveal().reveal('.box-img', {
        duration: 1400,
        distance: '100px',
        origin: 'right',
        opacity: 0,
        interval: 200,
        viewFactor: 0.5,
        cleanup: true
    });
}

function initAccordion() {
    $('.accordion-title').click(function() {
        var $title = $(this);
        var $item = $title.parent('.accordion-item');
        var $content = $title.next('.accordion-content');

        $item.toggleClass('active');
        $content.slideToggle(300);
    });
}

function initQuantityButtons() {
    $('.woocommerce').on('click', '.qty-btn', function(e) {
        var $btn = $(this);
        var $input = $btn.siblings('input');
        var value = $input.val();
        var direction = $btn.hasClass('qty-down') ? 'Down' : 'Up';

        $input[0]['step' + direction](); // invoke stepUp or stepDown

        if (value !== $input.val()) {
            $input.trigger('change'); // trigger change event only when the value has changed
        }

        e.preventDefault();
    });
}

function initStickyHeader() {
    var $window = $(window);
    var $header = $('.site-header');
    var sticky = false;

    $(document.documentElement).addClass('sh');

    $window.scroll(function(e) {
        var pageY = $window.scrollTop();

        if (!sticky && pageY > 900) {
            sticky = true;
            $header.addClass('sticky');
        } else if(sticky && pageY < 28) {
            sticky = false;
            $header.removeClass('sticky');
        }
    });
}
