<?php
/**
 * Template Name: Designer Template
 */
get_header();

$honeycomb = get_page_by_path( 'honeycomb-2', OBJECT, 'product' );
$color_terms = wp_get_post_terms( $honeycomb->ID, 'pa_color' );
$colors = array_map(function($term) {
    $hex = get_term_meta($term->term_id, 'product_attribute_color', true);
    return [
       'id' => $term->term_id,
       'slug' => $term->slug,
       'name' => $term->name,
       'description' => $term->description,
       'hex' => $hex,
    ];
}, $color_terms);

$bg_colors = [
    ''
];
?>

<section id="designer" data-colors="<?php echo htmlspecialchars(json_encode($colors), ENT_QUOTES, 'UTF-8') ?>">

    <div class="designer-settings">
        <button class="btn btn--hollow-base" id="setting-spacing">Vrije ruimte</button>
        <button class="btn btn--hollow-base" id="setting-orientation">Orientatie</button>
        <button class="btn btn--primary" id="setting-preview">Preview</button>
    </div>

    <div class="designer-config">
        <ul class="colors">
            <?php foreach ($colors as $color): ?>
                <li class="<?php echo $color['slug'] ?>" data-hex="<?php echo $color['hex'] ?>">
                    <?php echo $color['name'] ?>
                </li>
            <?php endforeach; ?>
        </ul>
        <button class="btn btn--hollow-base btn--sm" id="tile-delete-btn">Verwijderen</button>
    </div>

    <svg class="tile-grid" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <pattern id="fabric" x="0" y="0" width="1" height="1">
                <image width="100" height="87" xlink:href="<?php echo asset('honeycomb-transparent.png') ?>"/>
                <!--<image opacity="0.5" width="250" height="250" xlink:href="https://www.transparenttextures.com/patterns/45-degree-fabric-dark.png"/>!-->
            </pattern>
        </defs>
        <g class="tiles"></g>
    </svg>

</section>

<?php get_footer(); ?>
