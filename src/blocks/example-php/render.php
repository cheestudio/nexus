<?php
if (!defined('ABSPATH')) exit;

// $NAME = $attributes['name'];

$block_props = get_block_wrapper_attributes([
  "class" => "example-php-block"
]); ?>

<div <?= $block_props ?>>
  <h1>Example PHP Block: FRONTEND</h1>
</div>
