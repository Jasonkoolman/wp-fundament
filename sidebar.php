<?php
if ( ! is_active_sidebar('primary') ) {
	return;
}
?>

<aside class="site-sidebar">
	<ul><?php dynamic_sidebar('primary') ?></ul>
</aside><!-- #sidebar -->