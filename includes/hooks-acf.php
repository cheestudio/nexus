<?php

namespace CHEE_NAMESPACE;

/* ACF Key (defined in wp-config.php)
========================================================= */
if (defined('ACF_KEY')) {
	define('ACF_PRO_LICENSE', ACF_KEY);
}


/* Custom ACF Functions
========================================================= */

// Register ACF options pages and subpages
add_action('acf/init', 'CHEE_NAMESPACE\add_acf_options_pages');

// add_filter( 'acf/load_field/key=FIELD_KEY', 'CHEE_NAMESPACE\add_menus_as_acf_select_options' );


function add_acf_options_pages() {
	if (function_exists('acf_add_options_page')) {
		acf_add_options_sub_page(array(
			'page_title'  => 'Theme Settings',
			'menu_title'  => 'Theme Settings',
			'parent_slug' => 'options-general.php',
			'capability'  => 'manage_options',
			'autoload'    => true,
			'position'    => '0.1',
		));
	}
}


// Add registered menus as options in the ACF block

// function add_menus_as_acf_select_options( $field ) {
// 	$choices = array();

// 	if ( $menus = wp_get_nav_menus() ) {
// 		foreach ( $menus as $menu ) {
// 			$choices[ $menu->term_id ] = $menu->name;
// 		}
// 	}

// 	$field['choices'] = $choices;

// 	return $field;
// }