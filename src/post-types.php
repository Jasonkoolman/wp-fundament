<?php

/**
 * Register (custom) post-types here.
 */
register_post_type('review', [
    'label'       => 'Recensie',
    'supports'    => ['title', 'excerpt'],
    'menu_icon'   => 'dashicons-format-quote',
    'public'      => false,
    'show_ui'     => true
]);

register_taxonomy('faq-category', 'faq', [
    'label'      => __( 'Category', 'woocommerce' ),
    'public'     => false,
    'show_ui'    => true,
    'rewrite'    => false
]);

register_post_type('faq', [
    'label'       => 'FAQ',
    'supports'    => ['title', 'editor'],
    'menu_icon'   => 'dashicons-editor-help',
    'public'      => false,
    'show_ui'     => true
]);
