import { BlockEdit, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';

const applicableBlocks = ['core/paragraph', 'core/heading'];

addFilter(
  'blocks.registerBlockType',
  'jumpstart/balance-text/add-attribute',
  (settings, name) => {
    if (!applicableBlocks.includes(name)) {
      return settings;
    }

    return {
      ...settings,
      attributes: {
        ...settings.attributes,
        hasBalancedText: {
          type: 'boolean',
          default: false,
        },
      },
    };
  }
);

addFilter(
  'editor.BlockEdit',
  'jumpstart/balance-text/add-control',
  (BlockEdit) => {
    return (props) => {
      const { name, attributes, setAttributes, isSelected } = props;

      if (!applicableBlocks.includes(name) || !isSelected) {
        return <BlockEdit {...props} />;
      }

      return <>
        <BlockEdit {...props} />
        <InspectorControls>
          <PanelBody title="Text Balance" initialOpen={false}>
            <ToggleControl
              label="Balance Text"
              checked={attributes.hasBalancedText}
              onChange={value => setAttributes({ hasBalancedText: value })}
              help="Enables better text distribution across lines"
            />
          </PanelBody>
        </InspectorControls>
      </>;
    };
  }
);

addFilter(
  'editor.BlockListBlock',
  'jumpstart/balance-text/render-backend',
  (BlockListBlock) => {
    return (props) => {
      const { name, attributes } = props;

      if (!applicableBlocks.includes(name) || !attributes.hasBalancedText) {
        return <BlockListBlock {...props} />;
      }

      return <BlockListBlock
        {...props}
        wrapperProps={{
          ...props.wrapperProps,
          className: `${props.wrapperProps?.className || ''} has-text-balance`.trim()
        }}
      />;
    };
  }
);

addFilter(
  'blocks.getSaveContent.extraProps',
  'jumpstart/balance-text/render-frontend',
  (props, blockType, attributes) => {
    if (!applicableBlocks.includes(blockType.name) || !attributes.hasBalancedText) {
      return props;
    }

    return {
      ...props,
      className: `${props.className || ''} has-text-balance`.trim()
    };
  }
); 