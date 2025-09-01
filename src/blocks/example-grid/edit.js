import {useEffect} from "react";
import {useBlockProps, InnerBlocks} from "@wordpress/block-editor";
import {useAppendBlock} from "../../js/lib/useAppendBlock";
import {Button} from "@wordpress/components";
import {__} from "@wordpress/i18n";

const ALLOWED_BLOCKS = ["chee/example-grid-item-block"];
const TEMPLATE = [["chee/example-grid-item-block"]];

export default function Edit({attributes, setAttributes, clientId}) {

  const appendBlock = useAppendBlock(clientId, "chee/example-grid-item-block");
  const {blockId} = attributes;
  const blockProps = useBlockProps({
    className: "example-grid-block",
  });

  useEffect(() => {
    if (!blockId) {
      setAttributes({blockId: clientId});
    }
  }, [clientId]);
  

  return (
    <div {...blockProps}>
      <InnerBlocks
        allowedBlocks={ALLOWED_BLOCKS}
        template={TEMPLATE}
        renderAppender={() => (
          <Button
            variant="primary"
            onClick={appendBlock}
          >
            Add Grid Item
          </Button>
        )}
      />
    </div>
  );
}
