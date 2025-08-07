import {useBlockProps, InnerBlocks} from "@wordpress/block-editor";
import {createBlock} from "@wordpress/blocks";
import {dispatch, select} from "@wordpress/data";
import {Button} from "@wordpress/components";
import {useEffect} from "react";
import {__} from "@wordpress/i18n";

const ALLOWED_BLOCKS = ["chee/example-grid-item-block"];
const TEMPLATE = [["chee/example-grid-item-block"]];

export default function Edit({attributes, setAttributes, clientId}) {
  const {blockId} = attributes;
  const blockProps = useBlockProps({
    className: "example-grid-block",
  });

  useEffect(() => {
    if (!blockId) {
      setAttributes({blockId: clientId});
    }
  }, [clientId]);

  function insertButtonBlock() {
    const innerCount = select("core/editor").getBlocksByClientId(clientId)[0].innerBlocks.length;
    let block = createBlock("chee/example-grid-item-block");
    dispatch("core/block-editor").insertBlock(block, innerCount, clientId);
  }

  return (
    <div {...blockProps}>
      <InnerBlocks
        allowedBlocks={ALLOWED_BLOCKS}
        template={TEMPLATE}
        renderAppender={() => (
          <Button
            variant="primary"
            onClick={insertButtonBlock}
          >
            Add Grid Item
          </Button>
        )}
      />
    </div>
  );
}
