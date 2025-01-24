<?php

namespace CHEE_NAMESPACE;

// Customize default block templates by post type
// add_action( 'init', 'CHEE_NAMESPACE\customize_page_post_type' );
// add_action( 'init', 'CHEE_NAMESPACE\customize_post_post_type' );

// Add custom classes to the body class
add_filter('body_class', 'CHEE_NAMESPACE\post_name_in_body_class');

// Add custom image sizes
add_action('after_setup_theme', 'CHEE_NAMESPACE\register_custom_image_sizes');
add_filter('image_size_names_choose', 'CHEE_NAMESPACE\add_custom_image_sizes_to_editor');

// Removes the unused IDs
add_filter('nav_menu_item_id', '__return_false');

// Image blocks fall back to alt text from the media library
add_filter( 'render_block', 'CHEE_NAMESPACE\img_block_alt_fallback', 10, 2 );

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
			'CHEE_NAMESPACE/header'
		),
		array(
			'core/paragraph',
			array(
				'placeholder' => 'Add paragraph …',
			)
		),
	);
}

function register_custom_image_sizes() {
	add_image_size('square', 500, 500, true);
}

function add_custom_image_sizes_to_editor($sizes) {
	return array_merge($sizes, array(
		'square' => __('Square 500x500'),
	));
}

function img_block_alt_fallback( $block_content, $block ) {
	if ( $block['blockName'] !== 'core/image' ) return $block_content;
	// Check if alt text was provided by the block.
	$search = ' alt="" ';
	if ( ! str_contains($block_content, $search) ) {
		return $block_content;
	}
	// Otherwise get alt text from the media library attachment.
	$attachment_id = $block['attrs']['id'] ?? '';
	$alt = get_post_meta($attachment_id, '_wp_attachment_image_alt', true );
	if ( $alt ) {
		$replace = ' alt="' . esc_attr($alt) . '" ';
		$block_content = str_replace( $search, $replace, $block_content );
	}
	return $block_content;
}
