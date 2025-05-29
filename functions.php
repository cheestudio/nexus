<?php

// hooks for general WordPress
require get_template_directory() . '/includes/hooks-wordpress.php';

// theme specific hooks
require get_template_directory() . '/includes/hooks-theme.php';

// custom nav walker
require get_template_directory() . '/includes/nav-walker.php';

// hooks for ACF
require get_template_directory() . '/includes/hooks-acf.php';

// enqueue scripts/styles
require get_template_directory() . '/includes/enqueue.php';

// lib
require get_template_directory() . '/includes/utilities.php';

// CPTs & taxonomies
require get_template_directory() . '/includes/custom-post-types.php';

// shortcodes
require get_template_directory() . '/includes/shortcodes.php';

// blocks
require get_template_directory() . '/includes/blocks.php';