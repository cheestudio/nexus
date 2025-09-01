import {useBlockProps, InnerBlocks} from "@wordpress/block-editor";

export default function Save({attributes}) {
  const {blockId} = attributes;
  // const blockIdClean = blockId ? blockId.replace(/-/g, "") : undefined;

  const blockProps = useBlockProps.save({
    className: "example-grid-block",
    "data-gallery": blockId || undefined,
  });

  return (
    <div {...blockProps}>
      <div className="grid">
        <InnerBlocks.Content />
      </div>
    </div>
  );
}
