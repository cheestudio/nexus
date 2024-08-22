// import "./editor.scss";
// import {__} from "@wordpress/i18n";

import {useBlockProps, RichText, InspectorControls, ColorPalette} from "@wordpress/block-editor";
import {PanelBody} from "@wordpress/components";
import {useEffect} from "@wordpress/element";

export default function Edit({attributes, setAttributes}) {
  const {text, color} = attributes;
  const wpData = wp.data.select("core/block-editor");
  const colorPalette = wpData.getSettings().colors;
  const blockProps = useBlockProps({
    style: {
      "--eyebrowColor": color,
    },
  });

  return (
    <div {...blockProps}>
      <RichText
        tagName="span"
        value={text}
        className="prehead"
        allowedFormats={[]}
        onChange={(value) => setAttributes({text: value})}
        placeholder="Section Title"
      />
      <InspectorControls>
        <PanelBody title="Color">
          <ColorPalette
            colors={colorPalette}
            disableCustomColors={true}
            value={color}
            onChange={(value) => setAttributes({color: value})}
          ></ColorPalette>
        </PanelBody>
      </InspectorControls>
    </div>
  );
}
