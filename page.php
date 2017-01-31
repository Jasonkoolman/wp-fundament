<?php get_header(); ?>

    <div class="container">

        <div class="page-wrap">

            <?php while ( have_posts() ): the_post(); ?>

                <header class="page-header">
                    <h1 class="page-title">
                        <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                    </h1>
                </header>

                <div class="page-content">
                    <?php the_content(); ?>
                </div>

                <?php wp_link_pages(); ?>

            <?php endwhile; ?>

        </div>

        <?php get_sidebar(); ?>

    </div>

<?php get_footer(); ?>