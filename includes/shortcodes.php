<?php

namespace CHEENAMESPACE;

// [year] outputs current year
add_shortcode('year', 'CHEENAMESPACE\year');

// fix to execute shortcodes in blocks
add_filter('render_block_core/shortcode', 'CHEENAMESPACE\render_shortcode_in_blocks');

// [copyright] outputs copyright text
add_shortcode('copyright', 'CHEENAMESPACE\copyright_shortcode');


/* Functions
========================================================= */
function year() {
	return current_time('Y');
}

function render_shortcode_in_blocks(string $block_content): string {
	return do_shortcode($block_content);
}

function copyright_shortcode($atts) {
	$atts = shortcode_atts(array(
		'site_title' => get_bloginfo('name'),
		'year_only' => false,
		'addendum' => '',
	), $atts);

	if ($atts['year_only']) {
		return date('Y');
	}

	$text = '&copy; ' . date('Y') . ' ' . $atts['site_title'] . ' ' . $atts['addendum'];

	return $text;
}
