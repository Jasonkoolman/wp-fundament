<?php get_header(); ?>

    <div class="container">

        <div class="page-wrap">

            <div class="page-body">

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

    </div>

<?php get_footer(); ?>
