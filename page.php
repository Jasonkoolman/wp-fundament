<?php get_header(); ?>

<header class="page-header">
    <h1 class="page-title"><?php the_title() ?></h1>
</header>

<div class="page-wrap">

    <div class="container">

        <div class="page-body">

            <?php while ( have_posts() ): the_post(); ?>

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
