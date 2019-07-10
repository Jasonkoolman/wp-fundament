(function($, window, document) {

    $('.accordion-title').click(function() {
        var $title = $(this);
        var $item = $title.parent('.accordion-item');
        var $content = $title.next('.accordion-content');

        $item.toggleClass('active');
        $content.slideToggle(300);
    });

    // new ScrollTrigger();

})(jQuery, window, document);
