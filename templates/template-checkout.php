<?php
/**
 * Template Name: Checkout Template
 */
get_header('compact');
?>

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
