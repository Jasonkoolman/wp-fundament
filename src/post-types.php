<?php
/**
 * Register (custom) post-types here.
 */
register_post_type('idea', [
    'label'       => 'Ideas',
    'supports'    => ['title', 'thumbnail'],
    'menu_icon'   => 'dashicons-lightbulb',
    'has_archive' => false
]);