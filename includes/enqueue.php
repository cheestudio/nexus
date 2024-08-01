<?php

namespace CHEE_NAMESPACE;

// styles/scripts for the frontend
add_action( 'wp_enqueue_scripts', 'CHEE_NAMESPACE\enqueue_frontend', 20 );

// styles/scripts for the frontend and the entire (not just the editor) backend edit page
add_action( 'wp_head', 'CHEE_NAMESPACE\render_gfont_preconnect', 1 );
add_action( 'enqueue_block_assets', 'CHEE_NAMESPACE\enqueue_frontend_and_backend' );

// styles/scripts for the block editor
add_action( 'enqueue_block_editor_assets', 'CHEE_NAMESPACE\enqueue_backend_js' );
add_action( 'after_setup_theme', 'CHEE_NAMESPACE\enqueue_backend_css' );

// get rid of jquery migrate (currently the only reason jquery is used is because of the Google Language Translator plugin...)
add_action( 'wp_default_scripts', 'CHEE_NAMESPACE\dequeue_jquery_migrate' );


function get_min_suffix() {
	return defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';
}

function get_version() {
	// add define('SCRIPT_DEBUG', true) to wp-config.php to enable dev mode
	static $version;
	if ( $version === null ) {
		$dev_mode = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG; 

		if ( ! $dev_mode ) {
			$version = wp_get_theme()->get( "Version" ); // get version from style.css
		} else {
			$min     = get_min_suffix();
			$files   = array(
				'dist/css/frontend' . $min . '.css',
				'dist/js/frontend' . $min . '.js',
				'dist/backend/backend.js',
			);
			$version = 0;
			foreach ( $files as $file ) {
				$filemtime = filemtime( get_stylesheet_directory() . '/' . $file );
				if ( $filemtime > $version ) {
					$version = $filemtime;
				}
			}
		}
	}

	return $version;
}

function enqueue_backend_css() {
	$min = get_min_suffix();
	add_editor_style( 'dist/css/backend' . $min . '.css' );
}

function enqueue_backend_js() {
	$version = get_version();

	// dependency logic by https://github.com/WordPress/gutenberg/issues/25330#issuecomment-1022935491
	$dependencies = array( 'wp-blocks', 'wp-dom-ready' );
	if ( is_object( get_current_screen() ) ) {
		if ( get_current_screen()->id == 'site-editor' ) {
			$dependencies[] = 'wp-edit-site';
		} elseif ( get_current_screen()->id == 'widgets' ) {
			$dependencies[] = 'wp-edit-widgets';
		} else {
			$dependencies[] = 'wp-edit-post';
		}
	} else {
		$dependencies[] = 'wp-edit-post';
	}

	wp_enqueue_script(
		'CHEE_NAMESPACE-backend',
		get_stylesheet_directory_uri() . '/dist/backend/backend.js',
		$dependencies,
		$version
	);
}

function enqueue_frontend() {
	$min          = get_min_suffix();
	$version      = get_version();
	$dependencies = array( 'global-styles', 'gfonts' );

	// theme
	wp_enqueue_style( 'CHEE_NAMESPACE', get_stylesheet_directory_uri() . '/dist/css/frontend' . $min . '.css', $dependencies, $version );
	wp_enqueue_script( 'CHEE_NAMESPACE', get_stylesheet_directory_uri() . '/dist/js/frontend' . $min . '.js', array(), $version, true );

}

function render_gfont_preconnect() {
	?>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<?php
}

function enqueue_frontend_and_backend() {
	wp_enqueue_style( 'gfonts', 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap', array(), null );
}

function dequeue_jquery_migrate( $scripts ) {
	if ( ! is_admin() && ! empty( $scripts->registered['jquery'] ) ) {
		$scripts->registered['jquery']->deps = array_diff(
			$scripts->registered['jquery']->deps,
			[ 'jquery-migrate' ]
		);
	}
}
