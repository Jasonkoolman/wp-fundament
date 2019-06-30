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
 * Shift the checkout order
 */
remove_action( 'woocommerce_checkout_order_review', 'woocommerce_checkout_payment', 20 );
