import { BlockEdit, InspectorControls } from '@wordpress/block-editor';
import { Panel, PanelBody, ToggleControl } from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';

const applicableBlocks = ['chee/example-block'];

addFilter(
  'blocks.registerBlockType',
  'chee/link-card/add-attribute',
  (settings, name) => {
    if (!applicableBlocks.includes(name)) {
      return settings;
    }

    return {
      ...settings,
      attributes: {
        ...settings.attributes,
        hasLinkCard: {
          type: 'boolean',
          default: false,
        },
      },
    };
  }
);

addFilter(
  'editor.BlockEdit',
  'chee/link-card/add-control',
  (BlockEdit) => {
    return (props) => {
      const { name, attributes, setAttributes, isSelected } = props;

      if (!applicableBlocks.includes(name) || !isSelected) {
        return <BlockEdit {...props} />;
      }

      return <>
        <BlockEdit {...props} />
        <InspectorControls>
          <Panel>
            <PanelBody title="Link Element" initialOpen={false}>
              <ToggleControl
                label="Wrap block in link"
                checked={attributes.hasLinkCard}
                onChange={value => setAttributes({ hasLinkCard: value })}
                help="Makes entire block clickable (uses the first linked element)"
              />
            </PanelBody>
          </Panel>
        </InspectorControls>
      </>;
    };
  }
);

addFilter(
  'editor.BlockListBlock',
  'chee/link-card/render-backend',
  (BlockListBlock) => {
    return (props) => {
      const { name, attributes } = props;

      if (!applicableBlocks.includes(name) || !attributes.hasLinkCard) {
        return <BlockListBlock {...props} />;
      }

      return <BlockListBlock
        {...props}
        wrapperProps={{
          ...props.wrapperProps,
          className: `${props.wrapperProps?.className || ''} wcag-linked-element`.trim()
        }}
      />;
    };
  }
);

addFilter(
  'blocks.getSaveContent.extraProps',
  'chee/link-card/render-frontend',
  (props, blockType, attributes) => {
    if (!applicableBlocks.includes(blockType.name) || !attributes.hasLinkCard) {
      return props;
    }

    return {
      ...props,
      className: `${props.className || ''} wcag-card`.trim()
    };
  }
); 