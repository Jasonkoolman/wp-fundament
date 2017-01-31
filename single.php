<?php get_header(); ?>

    <div class="container">

        <div class="page-wrap">

            <?php while ( have_posts() ): the_post(); ?>

                <?php template('parts/content') ?>

            <?php endwhile; ?>

        </div>

        <?php get_sidebar(); ?>

    </div>

<?php get_footer(); ?>