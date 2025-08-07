import {__} from "@wordpress/i18n";
import {useBlockProps, InnerBlocks} from "@wordpress/block-editor";

const ALLOWED_BLOCKS = ["core/list"];
const TEMPLATE = [["core/list"]];

export default function Edit({attributes, setAttributes}) {
  const blockProps = useBlockProps({
    className: "example-innerblocks",
  });

  return (
    <div {...blockProps}>
      <InnerBlocks
        allowedBlocks={ALLOWED_BLOCKS}
        template={TEMPLATE}
        templateLock={false}
      />
    </div>
  );
}
