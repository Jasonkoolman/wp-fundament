<!DOCTYPE html>
<html <?php language_attributes() ?>>
<head>
	<meta charset="utf-8">
	<meta name="keywords" content="keywords">
	<meta name="description" content="description">
	<meta name="robots" content="index,follow">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="icon" sizes="16x16" href="<?php echo get_template_directory_uri() . '/favicon.ico' ?>">
	<?php wp_head() ?>
</head>

<body <?php body_class() ?>>

<div class="site-wrap">

	<div class="site-body">

		<header class="site-header">
			<div class="container">

				<div class="site-brand">
					<a href="<?php echo home_url() ?>">
						<img src="<?php echo asset('logo.svg') ?>" width="40" alt="Deex Design">
					</a>
				</div>

				<nav class="site-nav">
					<?php nav('primary') ?>

					<div class="actions">
						<?php if (is_cart()): ?>
							<a class="btn btn--sm btn--primary" href="<?php echo wc_permalink('checkout'); ?>">
								Afrekenen
							</a>
						<?php elseif(!is_product()): ?>
							<a class="btn btn--sm btn--primary" href="product/honeycomb">
								Kopen
							</a>
						<?php endif; ?>

						<a class="action" href="<?php echo wc_permalink('cart'); ?>">


							<svg width="24" height="24" viewBox="0 0 24 24" title="Winkelmand">
								<path d="M7,18c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S8.1,18,7,18z M1,4h2l3.6,7.6L5.2,14C5.1,14.3,5,14.7,5,15c0,1.1,0.9,2,2,2h12 v-2H7.4c-0.1,0-0.2-0.1-0.2-0.2c0,0,0-0.1,0-0.1L8.1,13h7.4c0.8,0,1.4-0.4,1.7-1l3.6-6.5C21,5.3,21,5.2,21,5c0-0.6-0.4-1-1-1H5.2 L4.8,3.1C4.5,2.5,3.8,2,3,2H1V4z M17,18c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S18.1,18,17,18z"></path>
							</svg>
							<span class="bubble"><?php echo WC()->cart->get_cart_contents_count() ?></span>
						</a>
						<a class="action" href="<?php echo wc_permalink('myaccount'); ?>">
							<svg width="24" height="24" viewbox="0 0 24 24" title="Mijn account">
								<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"></path>
							</svg>
						</a>
					</div>
				</nav>

			</div>
		</header>

		<main class="site-main">
