<?php
/**
 * Add any WP action here.
 */
add_action('wp_enqueue_scripts', function() {
    wp_enqueue_style('site-css', asset('site.min.css', 'css', true), [], null);
    wp_enqueue_script('site-js', asset('site.min.js', 'js', true), ['jquery'], null, true);
});