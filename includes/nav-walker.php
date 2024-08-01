<?php

// custom walker to insert markup before/around submenus

namespace CHEE_NAMESPACE;

class CHEE_NAMESPACE_Walker_Nav_Menu extends \Walker_Nav_Menu {
	function __construct() {
		// store the current menu item in a global var, so we can use it in start_lvl()
		add_filter( 'nav_menu_item_title', function ( $title, $menu_item ) {
			global $current_menu_item;
			$current_menu_item = array(
				'id'    => $menu_item->object_id,
				'url'   => $menu_item->url,
				'title' => $title
			);

			return $title;
		}, 10, 2 );
	}

	function start_lvl( &$output, $depth = 0, $args = null ) {
		$atts       = array( 'class' => $depth === 0 ? 'dropdown' : 'sub-menu' );
		$attributes = $this->build_atts( $atts );

		if ( $depth !== 0 ) {
			$output .= "<ul{$attributes}>";

			return;
		}

		global $current_menu_item;
		ob_start();
    // can place meta data as desired inside following div
		?>

	<div<?php echo $attributes ?>>
		<ul>
		<?php
		$output .= ob_get_clean();
	}

	function end_lvl( &$output, $depth = 0, $args = null ) {
		$output .= $depth === 0 ? '</ul></div>' : '</ul>';
	}
}
