<?php
/**
 * Add any WP action here.
 */
add_action('wp_enqueue_scripts', function() {
    wp_deregister_script('jquery-migrate');
    wp_deregister_script('jquery');
    wp_register_script('jquery', 'https://code.jquery.com/jquery-3.4.1.min.js', [], null);

    wp_enqueue_style('app-styles', asset('app.min.css', 'css', true), [], null);
    wp_enqueue_script('app-scripts', asset('app.min.js', 'js', true), ['jquery'], null, true);
    wp_enqueue_style('app-icons', 'https://fonts.googleapis.com/icon?family=Material+Icons', [], null);
});
