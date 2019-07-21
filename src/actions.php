<?php
/**
 * Add any WP action here.
 */
add_action('wp_enqueue_scripts', function() {
    wp_deregister_script('jquery-migrate');
    wp_deregister_script('jquery');
    wp_register_script('jquery', '//code.jquery.com/jquery-3.4.1.min.js', [], null, true);

    wp_enqueue_style('app', asset('app.min.css', 'css', true), [], null);
    wp_enqueue_script('app', asset('app.min.js', 'js', true), ['jquery'], null, true);

    wp_enqueue_script('scroll-reveal', asset('scroll-reveal.min.js', 'js', true), [], null, false);
    wp_enqueue_script('tilt', asset('tilt.jquery.min.js', 'js', true), ['jquery'], null, false);
});

/**
 * Cleanup WP body classes.
 */
add_filter('body_class', function ($classes) {
    $rename = [
        'page-id' => null,
        'page-template' => 'template',
        'page-template-templates' => null
    ];

    foreach ($classes as $key => $class) {
        foreach ($rename as $search => $replace) {
            if (strncmp($class, $search, strlen($search)) === 0) {
                $classes[$key] = is_null($replace) ? '' : str_replace($search, $replace, $class);
            }
        }
    }

    return array_filter($classes, 'strlen');
});

add_filter( 'woocommerce_add_to_cart_fragments', 'woocommerce_header_add_to_cart_fragment' );

function woocommerce_header_add_to_cart_fragment( $fragments ) {
	global $woocommerce;
	ob_start();
	?>
    <a class="action cart-action" href="<?php echo wc_get_cart_url(); ?>" title="<?php _e( 'View your shopping cart' ); ?>">
        <?php echo sprintf ( _n( '%d item', '%d items', WC()->cart->get_cart_contents_count() ), WC()->cart->get_cart_contents_count() ); ?> - <?php echo WC()->cart->get_cart_total(); ?>
    </a>
    <?php
	$fragments['a.cart-action'] = ob_get_clean();
	return $fragments;
}
