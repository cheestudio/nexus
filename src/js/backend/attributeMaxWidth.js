import {BlockEdit, InspectorControls} from '@wordpress/block-editor';
import {PanelBody, RangeControl} from '@wordpress/components';
import {addFilter} from '@wordpress/hooks';

const {createHigherOrderComponent} = wp.compose;
const applicableBlocks = ['core/paragraph', 'core/heading'];

addFilter(
	'blocks.registerBlockType',
	'chee/max-width/add-attribute',
	( settings, name ) => {
		if ( !applicableBlocks.includes( name ) ) {
			return settings;
		}

		return {
			...settings,
			attributes: {
				...settings.attributes,
				maxWidth: {
					type: 'integer',
					default: null,
				},
			},
		};
	}
);

addFilter(
	'editor.BlockEdit',
	'chee/max-width/add-control',
	( BlockEdit ) => {
		return ( props ) => {
			const {name, attributes, setAttributes, isSelected} = props;

			if ( !applicableBlocks.includes( name ) || !isSelected ) {
				return <BlockEdit {...props} />;
			}

			return <>
				<BlockEdit {...props} />
				<InspectorControls>
					<PanelBody title="Width Settings">
						<RangeControl
							label="Max Width (px)"
							value={attributes.maxWidth ? attributes.maxWidth : null}
							onChange={value => setAttributes( {maxWidth: value} )}
							allowReset={true}
							min={200}
							max={1200}
							step={5}
							help="If this setting isn't working well, reset it and wrap the text in a Group block instead for better control."
						/>
					</PanelBody>
				</InspectorControls>
			</>;
		};
	}
);

// render on the backend
addFilter(
	'editor.BlockListBlock',
	'chee/max-width/render-backend',
	createHigherOrderComponent( ( BlockListBlock ) => {
		return ( props ) => {
			const {name, attributes} = props;

			if ( !applicableBlocks.includes( name ) || !attributes.maxWidth ) {
				return <BlockListBlock {...props}/>;
			}

			return <BlockListBlock
				{...props}
				wrapperProps={{style: {maxWidth: attributes.maxWidth}}}/>;
		};
	}, 'macMaxWidthAttribute' )
);

// render on the frontend
addFilter(
	'blocks.getSaveContent.extraProps',
	'chee/max-width/render-frontend',
	( props, blockType, attributes ) => {
		if ( !applicableBlocks.includes( blockType.name ) || !attributes.maxWidth ) {
			return props;
		}

		return {
			...props,
			style: {
				...props.style,
				maxWidth: attributes.maxWidth
			},
		};
	}
);
