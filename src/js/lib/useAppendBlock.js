// Custom hook for manually appending a block
// Usage: const appendBlock = useAppendBlock({ clientId, 'namespace/blockname' });

import { createBlock } from "@wordpress/blocks";
import { dispatch, select } from "@wordpress/data";

export const useAppendBlock = (clientId, block) => {
  const appendBlock = () => {
    if (!block) return;
    const
      innerBlocksLength = select("core/editor").getBlocksByClientId(clientId)[0].innerBlocks.length,
      blockSelection = createBlock(block),
      disatchedBlock = dispatch("core/block-editor").insertBlock(blockSelection, innerBlocksLength, clientId);
    return disatchedBlock;
  }
  return appendBlock;
}