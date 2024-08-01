<?php

/* ACF Builder + Block Registration Workflows (optional)
========================================================= */
$acf_builder = true;
$acf_blocks  = true;

/* Register Fields (can be removed if $acf_builder == false)
========================================================= */

use StoutLogic\AcfBuilder\FieldsBuilder;

require_once(dirname(__DIR__) . '/includes/acf-builder/autoload.php');

define('FIELDS_DIR', dirname(__FILE__) . '/acf-fields');
define('BLOCK_FIELDS_DIR', dirname(__DIR__) . '/acf-blocks/');

function acf_builder_field_registration() {
  if (is_dir(FIELDS_DIR)) {
    foreach (glob(FIELDS_DIR . '/*.php') as $file_path) {
      $fields = include $file_path; 
      if ($fields !== true) {
        if (!is_array($fields)) {
          $fields = [$fields];
        }
        foreach ($fields as $field) {
          if ($field instanceof FieldsBuilder) {
            acf_add_local_field_group($field->build());
          }
        }
      }
    }
  }
}

/* Register Blocks (can be removed if $acf_blocks == false)
========================================================= */


function register_acf_blocks() {
  define('BLOCKS_DIR', dirname(__FILE__, 2) . '/acf-blocks');
  foreach (glob(BLOCKS_DIR . '/**/block.json') as $block_path) {
    $block_json_path = basename(dirname($block_path));
    register_block_type(BLOCKS_DIR . '/' . $block_json_path);
  }
}

/* Register Block Fields
========================================================= */

function register_acf_block_fields() {
  foreach (glob(BLOCK_FIELDS_DIR . '**/fields.php') as $file_path) {
    $fields = include $file_path; 
    if ($fields) {
      if (!is_array($fields)) {
        $fields = [$fields];
      }
      foreach ($fields as $field) {
        if ($field instanceof FieldsBuilder) {
          acf_add_local_field_group($field->build());
        }
      }
    }
  }
}


/* Admin Notice
========================================================= */

function acf_builder_notice() {
  global $pagenow;
  if (!is_admin()) {
    return false;
  }
  if ($pagenow == 'edit.php') {
    if (isset($_GET['post_type']) && $_GET['post_type'] == 'acf-field-group') {
      echo '<div class="notice notice-error">
      <h2>Custom Fields managed via ACF Builder</h2>
      <p>ACF Builder library is located within the /init/ of this theme folder. Please <a target="_blank" rel="noopener" href="https://github.com/cheestudio/startup-blocks">view the README for more information</a> on this theme and the field management workflow.</p>
      </div>';
    }
  }
}

/* Toggle Builder/Block Workflows
========================================================= */
if ($acf_builder == true) {
  add_action('acf/init', 'acf_builder_field_registration');
  add_action('admin_notices', 'acf_builder_notice');
}

if ($acf_blocks == true) {
  add_action('init', 'register_acf_blocks', 5);
}

if ($acf_builder && $acf_blocks == true) {
  add_action('acf/init', 'register_acf_block_fields');
}


/* ACF Builder Helper Functions
========================================================= */

// Block Class
function block_class_id($block_entry, $class) {
  $className = $class;

  if (!empty($block_entry['anchor'])) {
    $id = $block_entry['anchor'];
  }
  if (!empty($block_entry['className'])) {
    $className .= ' ' . $block_entry['className'];
  }
  if (!empty($block_entry['align'])) {
    $className .= ' align' . $block_entry['align'];
  }

  $output = 'class="' . esc_attr($className) . '"';
  if (isset($id)) {
    $output .= 'id="' . esc_attr($id) . '"';
  }

  echo $output;
}

// Block Field Group Path
function blockFieldGroup($file) {
  $path = basename(dirname($file));
  $name = str_replace('-', '_', $path);
  $group = $name . '_group';
  return get_field($group);
}

// Block Asset Path
// usage: echo block_path(__DIR__);
function block_path($dir) {
  return esc_url(get_template_directory_uri()) . '/acf-blocks/' . basename($dir);
}

// Block Image Preview
function block_preview($blockpath) {
  echo '<img data="block_preview" src="' . get_template_directory_uri() . '/acf-blocks/' . basename(dirname($blockpath)) . '/preview.jpg" width="450" height="250">';
}
