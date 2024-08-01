<?php

namespace CHEE_NAMESPACE;

// Register Resource Post Type
// add_action( 'init', 'CHEE_NAMESPACE\resource_post_type', 0 );

function resource_post_type() {

  $single = 'Resource';
  $plural = 'Resources';

  $labels = array(
    'name'                => _x($plural, 'Post Type General Name', 'text_domain'),
    'singular_name'       => _x($single, 'Post Type Singular Name', 'text_domain'),
    'menu_name'           => __($plural, 'text_domain'),
    'parent_item_colon'   => __('Parent ' . $single . ':', 'text_domain'),
    'all_items'           => __('All ' . $plural, 'text_domain'),
    'view_item'           => __('View ' . $single, 'text_domain'),
    'add_new_item'        => __('Add New ' . $single, 'text_domain'),
    'add_new'             => __('New ' . $single, 'text_domain'),
    'edit_item'           => __('Edit ' . $single, 'text_domain'),
    'update_item'         => __('Update ' . $single, 'text_domain'),
    'search_items'        => __('Search ' . $plural, 'text_domain'),
    'not_found'           => __('No ' . $plural . ' found', 'text_domain'),
    'not_found_in_trash'  => __('No ' . $plural . ' found in Trash', 'text_domain'),
  );

  $args = array(
    'label'               => __($single, 'text_domain'),
    'description'         => __($single . ' information pages', 'text_domain'),
    'labels'              => $labels,
    'supports'            => array('title', 'editor', 'thumbnail', 'revisions'),
    'taxonomies'          => array('category', 'post_tag'),
    'hierarchical'        => false,
    'public'              => true,
    'show_ui'             => true,
    'show_in_menu'        => true,
    'show_in_nav_menus'   => true,
    'show_in_admin_bar'   => true,
    'show_in_rest'        => true,
    'menu_icon'           => 'dashicons-',
    'menu_position'       => 5,
    'can_export'          => true,
    'has_archive'         => true,
    'exclude_from_search' => false,
    'publicly_queryable'  => true,
    'capability_type'     => 'page',
    'rewrite'             => array(
      'slug'       => 'resource',
      'with_front' => false
    )
  );
  register_post_type('resource', $args);
}
