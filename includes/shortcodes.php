<?php

namespace CHEENAMESPACE;

// [year] outputs current year
add_shortcode( 'year', 'CHEENAMESPACE\year' );

// fix to execute shortcodes in blocks
add_filter('render_block_core/shortcode', 'CHEENAMESPACE\render_shortcode_in_blocks'); 

/* Functions
========================================================= */
function year() {
	return current_time( 'Y' );
}

function render_shortcode_in_blocks(string $block_content): string {
	return do_shortcode($block_content);
}

