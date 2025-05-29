<?php

namespace CHEENAMESPACE;

// Register React blocks
add_action( 'init', 'CHEENAMESPACE\register_blocks' );

// Add Custom Block Category
add_filter( 'block_categories_all', 'CHEENAMESPACE\add_custom_block_category' );


/* Functions
========================================================= */
function register_blocks() {
	$blocksDir = wp_normalize_path( __DIR__ . '/../dist/blocks' );
	wp_register_block_types_from_metadata_collection(
		$blocksDir,
		$blocksDir . '/blocks-manifest.php'
	);
}

function add_custom_block_category( $categories ) {
	array_unshift( $categories, array(
		'slug'  => 'custom-blocks',
		'title' => 'Custom Blocks'
	) );
	return $categories;
}

