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
?>

<header class="page-header">
    <h1 class="page-title"><?php the_title() ?></h1>
</header>

<section class="app-section" id="designer" data-colors="<?php echo htmlspecialchars(json_encode($colors), ENT_QUOTES, 'UTF-8') ?>">

    <div class="tile-config">
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
                <image opacity="0.4" width="250" height="250" xlink:href="https://www.transparenttextures.com/patterns/45-degree-fabric-dark.png"/>
            </pattern>
        </defs>
        <g class="tiles"></g>
    </svg>

    <form class="designer-form">
        <div class="form-group">
            <input class="input" type="checkbox" id="3d"> 3D effect
        </div>
        <div class="form-group">
            <input class="input" type="checkbox" id="relaxed"> Ruimte tussen honeycombs
        </div>
        <div class="form-group">
            <input class="input" type="checkbox" id="orientation"> Orientatie
        </div>
    </form>

</section>

<?php get_footer(); ?>
