<?php

namespace CHEE_NAMESPACE;

// Register React blocks
add_action( 'init', 'CHEE_NAMESPACE\register_blocks' );


// Add Custom Block Category
add_filter( 'block_categories_all', 'CHEE_NAMESPACE\add_custom_block_category' );


function register_blocks() {
	register_block_type( __DIR__ . '/../blocks/back-to-top' );
}

function add_custom_block_category( $categories ) {
	array_unshift( $categories, array(
		'slug'  => 'custom-blocks',
		'title' => 'Custom Blocks'
	) );
	return $categories;
}

