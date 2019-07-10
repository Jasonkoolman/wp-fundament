<?php get_header(); ?>

    <header class="page-header">
        <h1 class="page-title"><?php the_title() ?></h1>
    </header>

    <div class="page-wrap">

        <div class="container">

            <div class="page-body">

                <?php woocommerce_content() ?>

            </div>

        </div>

    </div>

<?php get_footer(); ?>
