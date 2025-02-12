wp.domReady(() => {
  // BUTTON(S) BLOCK
  wp.blocks.unregisterBlockStyle("core/button", ["fill", "outline"]);
  wp.blocks.registerBlockStyle("core/button", {
    name: "primary",
    label: "Primary",
    isDefault: true,
  });
  wp.blocks.registerBlockStyle("core/button", {
    name: "secondary",
    label: "Secondary",
  });
  wp.blocks.registerBlockStyle("core/button", {
    name: "tertiary",
    label: "Tertiary",
  });

  // PARAGRAPH BLOCK
  // wp.blocks.registerBlockStyle( 'core/paragraph', {
  // 	name: 'large',
  // 	label: 'Large'
  // } );

  // SEPARATOR BLOCK
  wp.blocks.unregisterBlockStyle("core/separator", ["dots", "wide"]);
  wp.blocks.registerBlockStyle("core/separator", {
    name: "alt",
    label: "Alternate",
  });

  // LIST BLOCK
  wp.blocks.registerBlockStyle("core/list", {
    name: "two-col",
    label: "Two Column",
  });
});
