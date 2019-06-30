<aside class="page-sidebar">
	<?php if (is_checkout()): ?>
		<div class="card">
			<img src="https://image.freepik.com/free-vector/flat-delivery-truck-city_23-2147675780.jpg">
		</div>
	<?php elseif (is_active_sidebar('primary')): ?>
		<ul><?php dynamic_sidebar('primary') ?></ul>
	<?php endif; ?>
</aside><!-- #sidebar -->
