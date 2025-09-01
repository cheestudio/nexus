import {registerBlockType} from "@wordpress/blocks";
import {blockIcon} from "../../js/lib/blockIcon";

import metadata from "./block.json";
import Edit from "./edit";

import "./style.scss";
import "./editor.scss";

registerBlockType(metadata.name, {
  icon: {
    src: blockIcon.src,
  },
  edit: Edit,
});
