<?php

namespace CHEE_NAMESPACE;

// Register React blocks
add_action( 'init', 'CHEE_NAMESPACE\register_blocks' );

// Add Custom Block Category
add_filter( 'block_categories_all', 'CHEE_NAMESPACE\add_custom_block_category' );


/* Functions
========================================================= */
function register_blocks() {
	$blocks = glob(__DIR__ . '/../dist/blocks/*', GLOB_ONLYDIR);
	foreach ($blocks as $block) {
			register_block_type($block);
	}
}

function add_custom_block_category( $categories ) {
	array_unshift( $categories, array(
		'slug'  => 'custom-blocks',
		'title' => 'Custom Blocks'
	) );
	return $categories;
}

