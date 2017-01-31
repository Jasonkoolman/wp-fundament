<?php get_header(); ?>

    <div class="container">

        <div class="page-wrap">

            <?php if ( have_posts() ) : ?>

                <header class="page-header">
                    <h1 class="page-title"><?php the_archive_title(); ?></h1>
                    <div class="page-info"><?php the_archive_description(); ?></div>
                </header><!-- .page-header -->

                <div class="page-content">

                    <?php while ( have_posts() ) : the_post(); ?>

                        <?php template('parts/content'); ?>

                    <?php endwhile; ?>

                </div>

                <?php the_posts_navigation(); ?>

            <?php else : ?>

                <?php template(['parts/content', 'none']); ?>

            <?php endif; ?>

        </div>

        <?php get_sidebar(); ?>

    </div>

<?php get_footer(); ?>
