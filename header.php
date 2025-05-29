<?php

namespace CHEENAMESPACE;

$has_primary_nav = has_nav_menu('primary_nav');
$has_secondary_nav = has_nav_menu('secondary_nav');
?>

<!doctype html>
<html <?php language_attributes(); ?>>

<head>
	<meta charset="<?php bloginfo('charset'); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

	<?php wp_body_open(); ?>

	<!-- Accessibility Skip to Content -->
	<a class="skip-link screen-reader-text" href="#top-of-content"><?php esc_html_e('Skip to content', 'CHEENAMESPACE'); ?></a>

		<header id="masthead" class="masthead">

			<div class="site-branding">
				<?php block_template_part('logo'); ?>
			</div>

			<button aria-controls="site-navigation" id="primary-menu-toggle" class="menu-toggle">
				<span class="bars"></span>
				<span class="screen-reader-text"><?php _e("Menu", 'CHEENAMESPACE'); ?></span>
			</button>

			<!-- <div aria-controls="site-navigation" class="site-navigation__close-click-outside" aria-hidden="true"></div> -->
			<?php if ($has_primary_nav || $has_secondary_nav) { ?>
				<div id="site-navigation" class="site-navigation is-hidden js-collapse" data-collapse-animate="on">
					<?php if ($has_primary_nav) { ?>
						<div class="header-menu-container menu-primary-menu-container">
							<?php
							wp_nav_menu(
								array(
									'theme_location' => 'primary_nav',
									'container'      => 'nav',
									'menu_class'     => 'header-menu header-menu-primary',
									'walker'         => new CHEENAMESPACE_Walker_Nav_Menu()
								)
							);
							?>
						</div>
					<?php } ?>
					<?php if ($has_secondary_nav) { ?>
						<div class="header-menu-container menu-secondary-menu-container">
							<?php
							wp_nav_menu(
								array(
									'theme_location'  => 'secondary_nav',
									'container'       => 'nav',
									'menu_class'      => 'header-menu header-menu-secondary',
								)
							);
							?>
						</div>
					<?php } ?>
				</div>
			<?php } ?>
		</header>
