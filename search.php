<?php get_header(); ?>

    <div class="container">

        <div class="page-wrap">

            <?php if ( have_posts() ) : ?>

                <header class="page-header">
                    <h1 class="page-title">
                        <?php printf(__('Search results for: %s', 'fundament'), get_search_query()); ?>
                    </h1>
                </header>

                <div class="page-content">

                    <?php while ( have_posts() ) : the_post(); ?>

                        <section class="result">

                            <header class="result-header">
                                <h1 class="result-title">
                                    <a href="<?php the_permalink() ?>"><?php the_title() ?></a>
                                </h1>
                            </header>

                            <div class="result-excerpt">
                                <?php the_excerpt(); ?>
                            </div>

                        </section>

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