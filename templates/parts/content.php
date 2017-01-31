<section class="entry">

	<header class="entry-header">
		<h1><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h1>
	</header>

	<div class="entry-content">
		<?php is_single() ? the_content() : the_excerpt(); ?>
	</div>

	<?php wp_link_pages(); ?>

</section>