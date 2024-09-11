<?php 
if (function_exists('get_field')) :
  $footer_code = get_field('footer_code', 'option');
endif; ?>

<footer class="site-footer">
  <?php block_footer_area(); ?>
  <?php wp_footer(); ?>
  <?php if (isset($footer_code)) echo $footer_code; ?>
</footer>

</body>

</html>
