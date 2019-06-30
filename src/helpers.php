<?php
/**
 * Get the path to the given asset.
 *
 * Supports cache busting assets by changing the version
 * hash when they're modified.
 *
 * @param string  $name
 * @param string  $directory
 * @param boolean $version
 * @return string
 */
function asset($name, $directory = 'img', $version = false)
{
    $asset = sprintf('%s/assets/%s/%s', get_template_directory_uri(), $directory, $name);

    if ($version) {
        $file = sprintf('%s/assets/%s/%s', get_template_directory(), $directory, $name);
        $asset = file_exists($file) ? $asset . '?' . filemtime($file) : $asset;
    }

    return $asset;
}

/**
 * Render a template and optionally pass scoped arguments.
 *
 * @param mixed  $name
 * @param array  $args
 * @param string $extension
 */
function template($name, $args = [], $extension = 'php')
{
    if (is_array($name)) {
        $name = implode('-', $name);
    }

    $template = new Template($name . '.' . $extension, $args);
    $template->render();
}

/**
 * Display a WP navigation menu.
 *
 * @param string $location
 * @param array  $attributes
 */
function nav($location, $attributes = [])
{
    $defaults = [
        'container' => false
    ];

    $attributes = array_merge($defaults, $attributes);
    $attributes['theme_location'] = $location;

    if (has_nav_menu($location)) {
        wp_nav_menu($attributes);
    }
}

/**
 * Get the absolute URL to the WooCommerce pages.
 *
 * @param string $name
 */
function wc_permalink($name) {
    $option = wc_get_page_id($name);

    return get_permalink($option);
}
