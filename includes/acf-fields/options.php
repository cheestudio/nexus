<?php

use StoutLogic\AcfBuilder\FieldsBuilder;

$options = new FieldsBuilder('theme_options', ['style' => 'seamless']);

$options
  ->addTab('Custom Scripts')
  ->addTextarea('head_code')
  ->addTextarea('body_code')
  ->addTextarea('footer_code')

  ->setLocation('options_page', '==', 'acf-options-theme-settings');

return $options;
