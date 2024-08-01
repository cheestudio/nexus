<?php

namespace CHEE_NAMESPACE;

// [year] outputs current year
add_shortcode( 'year', 'CHEE_NAMESPACE\year' );


function year() {
	return current_time( 'Y' );
}

// fix to execute shortcodes in blocks
add_filter('render_block_core/shortcode', function(string $block_content): string {
	return do_shortcode($block_content);
}); 