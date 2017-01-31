<?php get_header(); ?>

    <div class="container">

        <div class="page-wrap">

            <?php if ( have_posts() ): the_post(); ?>

                <?php template('parts/content'); ?>

            <?php else : ?>

                <?php template(['parts/content', 'none']); ?>

            <?php endif; ?>

        </div>

        <?php get_sidebar(); ?>

    </div>

<?php get_footer(); ?>
