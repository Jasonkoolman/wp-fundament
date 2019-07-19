<?php
/**
 * Template Name: Checkout Template
 */
get_header();
?>

<div class="page-topnav" style="border-bottom: 1px solid #E8e8E8;
    background: #FFF;
    line-height: 48px;">
    <div class="container">
        <a class="btn btn--link btn--prev" href="<?php echo wc_get_cart_url(); ?>">
            Terugkeren naar winkelmand
        </a>
    </div>
</div>

<div class="page-wrap">

    <div class="container">

        <div class="page-body">

            <?php while ( have_posts() ): the_post(); ?>

                <?php the_content(); ?>

            <?php endwhile; ?>

        </div>

    </div>

</div>

<?php get_footer(); ?>
