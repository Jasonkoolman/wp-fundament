(function($, window, document) {

    $('.accordion-title').click(function() {
        var $title = $(this);
        var $item = $title.parent('.accordion-item');
        var $content = $title.next('.accordion-content');

        $item.toggleClass('active');
        $content.slideToggle(300);
    });

    ScrollReveal().reveal('.app-hero .col:first-child > *', {
        delay: 400,
        duration: 1400,
        scale: 0.8,
        opacity: 0,
        interval: 200
    });

    ScrollReveal().reveal('.app-hero .col img', {
        duration: 1800,
        scale: 0.8,
        opacity: 0
    });

    ScrollReveal().reveal('.home-feature', {
        duration: 1400,
        distance: '80px',
        opacity: 0,
        interval: 200,
        viewFactor: 0.5
    });

})(jQuery, window, document);
