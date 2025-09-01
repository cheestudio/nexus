/* Usage:

"attributes": {
  ...,
  "backgroundColor": {
    "type": "string",
    "default": ""
  },
  "textColor": {
    "type": "string", 
    "default": ""
  }
}

const handleBackgroundColorChange = (newColor) => {
  setAttributes({
    backgroundColor: newColor,
  });
};

const handleTextColorChange = (newColor) => {
  setAttributes({
    textColor: newColor,
  });
};

<ColorSelection
  label={__("Background Color", "chee")}
  colorValue={backgroundColor}
  onColorChange={handleBackgroundColorChange}
/>

<ColorSelection
  label={__("Text Color", "chee")}
  colorValue={textColor}
  onColorChange={handleTextColorChange}
/>
*/

import { ColorPalette, BaseControl } from '@wordpress/components';
import { useSettings } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export function ColorSelection({ label, colorValue, onColorChange, disableCustomColors = true }) {
  const [colorPalette] = useSettings('color.palette');

  return (
    <BaseControl>
      <div className="color-picker-container">
        <BaseControl.VisualLabel>{label}</BaseControl.VisualLabel>
        <ColorPalette
          colors={colorPalette}
          disableCustomColors={disableCustomColors}
          value={colorValue}
          onChange={onColorChange}
        />
      </div>
    </BaseControl>
  );
}