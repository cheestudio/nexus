<?php

namespace CHEE_NAMESPACE;

// [year] outputs current year
add_shortcode( 'year', 'CHEE_NAMESPACE\year' );

// fix to execute shortcodes in blocks
add_filter('render_block_core/shortcode', 'CHEE_NAMESPACE\render_shortcode_in_blocks'); 

/* Functions
========================================================= */
function year() {
	return current_time( 'Y' );
}

function render_shortcode_in_blocks(string $block_content): string {
	return do_shortcode($block_content);
}

