document.addEventListener('DOMContentLoaded', () => {
  (function ($) {
    const initializeBlock = ($block) => {
      $('.accordion-row').each(function () {
        const rows = $(this).find('.toggle a');
        if (!rows.length) return;

        rows.on('click', function (e) {
          e.preventDefault();
          const current = $(this);
          const parent = current.closest('.entry');

          parent.toggleClass('active');
          parent.siblings('.active').removeClass('active').find('.inner').stop().slideUp();
          current.parent().next().stop().slideToggle();
        });
      });
    };

    initializeBlock();

    // Initialize dynamic block preview (editor).
    // if (window.acf) {
    //   window.acf.addAction('render_block_preview/type=BLOCK-NAME', initializeBlock);
    // }
  })(jQuery);
});