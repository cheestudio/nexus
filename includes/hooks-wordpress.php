<?php

namespace CHEENAMESPACE;

/* Init
========================================================= */

// Setup
add_action('after_setup_theme', 'CHEENAMESPACE\setup');

// Admin Bar tidy
add_action('admin_bar_menu', 'CHEENAMESPACE\remove_from_admin_bar', 999);

// Remove comments metaboxes from posts and pages
add_action('init', 'CHEENAMESPACE\remove_post_support_comments');

// Add a pingback url auto-discovery header for single posts, pages, or attachments
add_action('wp_head', 'CHEENAMESPACE\pingback_header');

// Disable emojis
add_action('init', 'CHEENAMESPACE\disable_emojis');

// Customize WP login page
add_action('login_head', 'CHEENAMESPACE\login_headerlogo');
add_filter('login_headerurl', 'CHEENAMESPACE\login_headerurl');
add_filter('login_headertext', 'CHEENAMESPACE\login_headertext');

// Don't load core/remote patterns
add_filter('should_load_remote_block_patterns', '__return_false');

// Don't inline styles
add_filter('styles_inline_size_limit', '__return_zero');

// Reduce auto-generated excerpt length from the default 55 words
add_filter('excerpt_length', 'CHEENAMESPACE\customize_excerpt_length');

// Reorder admin menu
add_filter('custom_menu_order', 'CHEENAMESPACE\reorder_admin_menu');
add_filter('menu_order', 'CHEENAMESPACE\reorder_admin_menu');

// Remove dashboard menu pages
add_action('admin_init', 'CHEENAMESPACE\remove_menu_pages');

// Custom admin CSS 
add_action('admin_head', 'CHEENAMESPACE\custom_admin_css');

// Replace "Howdy" in admin menu
add_filter('admin_bar_menu', 'CHEENAMESPACE\replace_howdy', 9992);

// Register Sidebars
// add_action('widgets_init', 'CHEENAMESPACE\register_widget_sidebars');


/* Functions
========================================================= */
function customize_excerpt_length() {
	return 20;
}

function login_headertext() {
	return get_bloginfo('name');
}

function login_headerurl() {
	return get_site_url();
}

function login_headerlogo() {
	$logo_content = do_blocks('<!-- wp:site-logo {"width":80,"shouldSyncIcon":true} /-->');
	if (!empty($logo_content)) {
		$dom = new \DOMDocument();
		@$dom->loadHTML($logo_content);
		$img = $dom->getElementsByTagName('img')->item(0);
		$logo_url = $img ? $img->getAttribute('src') : '';
?>
		<style type="text/css">
			body {
				background: #f5f5f5 !important;
			}

			#loginform {
				border: none;
				box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
				background: #fff;
				border: 2px solid white;
			}

			#loginform label {
				font-weight: 600;
				color: #555;
				margin-bottom: 5px;
			}

			#login h1 a {
				background: url(<?= esc_url($logo_url); ?>) center/cover no-repeat;
				width: min(100%, 340px);
				height: 120px;
				margin: 0;
			}

			#login a {
				transition: .6s cubic-bezier(.23, 1, .32, 1);
				color: #333 !important;
			}

			#login a:hover {
				color: #ccc !important;
			}

			#login #wp-submit {
				background: #333;
				border-radius: 0;
				border: 2px solid #333;
				box-shadow: none;
				color: white;
				cursor: pointer;
				display: inline-block;
				font-size: 16px;
				font-weight: 700;
				line-height: 1;
				padding: 10px 30px;
				text-align: center;
				text-shadow: none;
				transition: .6s cubic-bezier(.23, 1, .32, 1);
				user-select: none;
				vertical-align: baseline;
				white-space: nowrap;
				zoom: 1;
				-moz-user-select: none;
				-ms-user-select: none;
				-webkit-user-drag: none;
				-webkit-user-select: none;
			}

			#login #wp-submit:hover {
				border-color: #333;
				color: #333;
				background: white;
			}
		</style>
<?php
	}
}

function pingback_header() {
	if (is_singular() && pings_open()) {
		printf('<link rel="pingback" href="%s">', esc_url(get_bloginfo('pingback_url')));
	}
}

function disable_emojis() {
	remove_action('wp_head', 'print_emoji_detection_script', 7);
	remove_action('admin_print_scripts', 'print_emoji_detection_script');
	remove_action('wp_print_styles', 'print_emoji_styles');
	remove_action('admin_print_styles', 'print_emoji_styles');
	remove_filter('the_content_feed', 'wp_staticize_emoji');
	remove_filter('comment_text_rss', 'wp_staticize_emoji');
	remove_filter('wp_mail', 'wp_staticize_emoji_for_email');
	add_filter('tiny_mce_plugins', 'CHEENAMESPACE\disable_emojis_tinymce');
	add_filter('wp_resource_hints', 'CHEENAMESPACE\disable_emojis_remove_dns_prefetch', 10, 2);
}

function disable_emojis_tinymce($plugins) {
	if (is_array($plugins)) {
		return array_diff($plugins, array('wpemoji'));
	}

	return array();
}

function disable_emojis_remove_dns_prefetch($urls, $relation_type) {
	if ('dns-prefetch' == $relation_type) {
		$emoji_svg_url_bit = 'https://s.w.org/images/core/emoji/';
		foreach ($urls as $key => $url) {
			if (str_contains($url, $emoji_svg_url_bit)) {
				unset($urls[$key]);
			}
		}
	}

	return $urls;
}

function remove_post_support_comments() {
	remove_post_type_support('attachment', 'comments');
	remove_post_type_support('page', 'comments');
	remove_post_type_support('post', 'comments');
	remove_post_type_support('post', 'trackbacks');
}

function setup() {
	add_theme_support('block-template-parts');
	add_theme_support('responsive-embeds');
	add_theme_support('automatic-feed-links');
	add_theme_support('block-template-parts');
	add_theme_support('title-tag');
	add_theme_support('post-thumbnails');
	add_theme_support('editor-styles');
	add_theme_support('align-wide');
	add_theme_support('align-full');
	add_theme_support(
		'html5',
		array(
			'comment-list',
			'comment-form',
			'search-form',
			'gallery',
			'caption',
			'style',
			'script'
		)
	);

	// Custom Menus
	register_nav_menus(array(
		'primary_nav' => __('Primary Navigation'),
		'secondary_nav' => __('Secondary Navigation'),
		'footer_nav'  => __('Footer Navigation')
	));

	// remove some unused features
	remove_theme_support('core-block-patterns');
	// remove_theme_support('block-templates');
}

function remove_from_admin_bar($wp_admin_bar) {
	$wp_admin_bar->remove_node('comments');
	$wp_admin_bar->remove_node('wp-logo');
	$wp_admin_bar->remove_node('search');
}

function reorder_admin_menu($__return_true) {
	return [
		'index.php',
		'edit.php?post_type=page',
		'edit.php',
		// 'edit.php?post_type=POSTTYPE',
		'separator1',
		'themes.php',
		// 'edit-comments.php', (de-registered below)
		'users.php',
		'upload.php',
		'plugins.php',
		'tools.php',
		'admin.php?page=gf_edit_forms',
		'options-general.php',
		'separator2',
	];
}

function remove_menu_pages() {
	remove_menu_page('edit-comments.php');
}

function custom_admin_css() {
	echo '<style>
    #adminmenu li.wp-menu-separator {
    margin:10px 0 5px 0;
  }
  #adminmenu div.separator {
    background:rgba(255,255,255,0.1);
  } 
  #adminmenu .wp-submenu-head, #adminmenu a.menu-top {
    font-size:13px;
  }
  </style>';
}

function register_widget_sidebars() {
	register_sidebar(array(
		'name'          => __('Primary Sidebar'),
		'id'            => 'sidebar-primary',
		'before_widget' => '<div class="widget %1$s %2$s"><div class="widget-inner">',
		'after_widget'  => '</div></div>',
		'before_title'  => '<h3>',
		'after_title'   => '</h3>',
	));
}

function replace_howdy($wp_admin_bar) {
	$my_account = $wp_admin_bar->get_node('my-account');
	$newtitle = str_replace('Howdy,', 'Logged in as', $my_account->title);
	$wp_admin_bar->add_node(array(
		'id' => 'my-account',
		'title' => $newtitle,
	));
}
