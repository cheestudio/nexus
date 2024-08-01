<?php

namespace CHEE_NAMESPACE;

if (!class_exists('ACF')) {
	echo 'To use this theme, please install and activate the Advanced Custom Fields PRO plugin.';
	return;
}
$singular_block_template = is_singular()
	? get_block_template( get_stylesheet() . '//' . 'single-' . get_post_type(), 'wp_template_part' )
	: false;

get_header();
echo get_template();
echo '<pre>';
var_dump(wp_get_theme()->get('theme_root'));
echo '</pre>';
?>
<div class="wp-site-blocks is-layout-constrained" id="wp--skip-link--target">
		<?php
		if (is_404()) :
			block_template_part('404');

		elseif (is_search()) :
			block_template_part('search');

		elseif (have_posts()) :
			if (is_singular()) :
				if ($singular_block_template) :
					// echo do_blocks($singular_block_template->content);
					block_template_part('single-post');
				else :
					the_content();
				endif;

			elseif (is_home()) :
				block_template_part('archive');

			else :
				block_template_part('archive');

			endif;

		else :
			// archive page without results
			get_template_part('archive');

		endif;
		?>
</div>
<?php
get_footer();
