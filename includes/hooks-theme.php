<?php

namespace CHEE_NAMESPACE;

// Customize default block templates by post type
// add_action( 'init', 'CHEE_NAMESPACE\customize_page_post_type' );
// add_action( 'init', 'CHEE_NAMESPACE\customize_post_post_type' );

// Add custom classes to the body class
add_filter('body_class', 'CHEE_NAMESPACE\post_name_in_body_class');



// Removes the unused IDs
add_filter('nav_menu_item_id', '__return_false');


// Add a wrapper around core/list output, so we can style it without affecting other lists
// add_filter( 'render_block_core/list', 'CHEE_NAMESPACE\add_wrapper_around_core_list_block' );


/* Functions
========================================================= */
function post_name_in_body_class($classes) {
	if (is_singular()) {
		global $post;
		$parent = get_page($post->post_parent);
		array_push($classes, "{$post->post_name}");
		array_push($classes, "{$parent->post_name}");
	}
	return $classes;
}

function customize_post_post_type() {
	global $wp_post_types;

	$wp_post_types['post']->template = array(
		array(
			'core/heading',
			array(
				'className'   => 'is-style-bold',
				'placeholder' => 'Add paragraph …',
			)
		),
		array(
			'core/paragraph',
			array(
				'placeholder' => 'Add paragraph …',
			)
		),
	);
}

function customize_page_post_type() {
	global $wp_post_types;
	$wp_post_types['page']->template = array(
		array(
			'cHEECHEE_NAMESPACE/header'
		),
		array(
			'core/paragraph',
			array(
				'placeholder' => 'Add paragraph …',
			)
		),
	);
}


// function add_wrapper_around_core_list_block( $block_content ) {
// 	return '<div class="wp-block-list">' . $block_content . '</div>';
// }
