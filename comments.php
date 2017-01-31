<?php
if ( post_password_required() ) {
	return;
}
?>

<div class="comments">

	<?php if ( have_comments() ) : ?>
		<h2 class="comments-title">
			<?php the_title() ?> (<?php echo get_comments_number() ?>)
		</h2>

		<ol class="comments-list">
			<?php wp_list_comments([
				'style'      => 'ol',
				'short_ping' => true,
			]); ?>
		</ol>

		<?php if ( get_comment_pages_count() > 1 && get_option('page_comments') ) : ?>
			<nav class="comments-nav">
				<?php previous_comments_link(__('Older comments', 'fundament')); ?>
				<?php next_comments_link(__('Newer comments', 'fundament')); ?>
			</nav>
		<?php endif; ?>

	<?php endif; ?>

	<?php if ( ! comments_open() && (int)get_comments_number() && post_type_supports(get_post_type(), 'comments') ): ?>

		<p><?php _e('Comments are disabled', 'fundament'); ?></p>

	<?php endif; ?>

	<?php comment_form(); ?>

</div>