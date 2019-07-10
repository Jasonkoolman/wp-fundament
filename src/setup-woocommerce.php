<?php

/**
 * Sets up theme defaults and registers support for various WooCommerce features.
 */
add_theme_support('woocommerce');
// add_theme_support('wc-product-gallery-zoom');
// add_theme_support('wc-product-gallery-lightbox');
// add_theme_support('wc-product-gallery-slider');

/**
 * Disable the default WooCommerce stylesheet.
 *
 * @link https://docs.woocommerce.com/document/disable-the-default-stylesheet/
 */
add_filter('woocommerce_enqueue_styles', function($styles) {
    unset($styles['woocommerce-layout']);
    unset($styles['woocommerce-general']);
    unset($styles['woocommerce-smallscreen']);
    return $styles;
});

/**
 * Optimize template structure
 */
remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_title', 5 );

// Wrap checkout columns
add_action( 'woocommerce_checkout_before_customer_details', function() {
    echo '<div class="checkout-column-one">';
});
add_action( 'woocommerce_checkout_before_order_review_heading', function() {
    echo '<div class="checkout-column-two">';
});
add_action( 'woocommerce_checkout_after_customer_details', 'close_div');
add_action( 'woocommerce_checkout_after_order_review', 'close_div');

function close_div() {
    echo '</div>';
}

// Move coupon form below the checkout form
remove_action( 'woocommerce_before_checkout_form', 'woocommerce_checkout_coupon_form', 10 );
add_action( 'woocommerce_after_checkout_form', 'woocommerce_checkout_coupon_form', 5 );

// Product thumbnail in checkout
add_filter( 'woocommerce_cart_item_name', 'add_checkout_product_thumbnail', 20, 3 );

function add_checkout_product_thumbnail( $product_name, $cart_item, $cart_item_key ){
    if ( is_checkout() ) {
        $thumbnail  = $cart_item['data']->get_image([32, 32]);
        $product_html = '<div class="product-item-thumbnail">'.$thumbnail.'</div> ';
        $product_name = $product_html . $product_name;
    }
    return $product_name;
}
