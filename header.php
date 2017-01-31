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

	<header class="site-header">
		<div class="container">

			<div class="site-brand">
				Fundament
			</div>

			<nav class="site-nav">
				<?php nav('primary') ?>
			</nav>

		</div>
	</header>

	<main class="site-main">