<?php
if (!defined('ABSPATH')) {
    exit;
}
$text  = $attributes['text'];
$color = $attributes['color'];
$block_props = get_block_wrapper_attributes([
	"style" => "--eyebrowColor: {$color};"
]);
?>

<div <?= $block_props ?>>
	<span><?= esc_html($text); ?></span>
</div>
