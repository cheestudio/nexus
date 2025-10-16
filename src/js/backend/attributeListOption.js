import { InspectorControls} from '@wordpress/block-editor';
import {PanelBody, RangeControl} from '@wordpress/components';
import {addFilter} from '@wordpress/hooks';

const applicableBlocks = ['core/list'];

addFilter(
	'blocks.registerBlockType',
	'evcc/list-option/add-attribute',
	( settings, name ) => {
		if ( !applicableBlocks.includes( name ) ) {
			return settings;
		}

		return {
			...settings,
			attributes: {
				...settings.attributes,
				columnList: {
					type: 'number',
					default: 1,
				},
			},
		};
	}
);

addFilter(
	'editor.BlockEdit',
	'evcc/list-option/add-control',
	( BlockEdit ) => {
		return ( props ) => {
			const {name, attributes, setAttributes, isSelected} = props;

			if ( !applicableBlocks.includes( name ) || !isSelected ) {
				return <BlockEdit {...props} />;
			}

			return <>
				<BlockEdit {...props} />
        <InspectorControls>
				<PanelBody title="List Options" initialOpen={false}>
					<RangeControl
						label="Column List"
						value={attributes.columnList}
						onChange={(value) => setAttributes({ columnList: value })}
						min={1}
						max={6}
					/>
				</PanelBody>
			</InspectorControls>
			</>;
		};
	}
);

// Apply the CSS variable on the backend
addFilter(
	'editor.BlockListBlock',
	'evcc/list-option/render-backend',
	( BlockListBlock ) => {
		return ( props ) => {
			const {name, attributes} = props;

			if ( !applicableBlocks.includes( name )) {
				return <BlockListBlock {...props}/>;
			}

			const style = {
				'--columnList': attributes.columnList.toString()
			};

			return <div style={style}>
				<BlockListBlock {...props}/>
			</div>;
		};
	}
);

// Apply the CSS variable on the frontend
addFilter(
	'blocks.getSaveContent.extraProps',
	'evcc/list-option/render-frontend',
	( props, blockType, attributes ) => {
		if ( !applicableBlocks.includes( blockType.name )) {
			return props;
		}

		const style = {
			'--columnList': attributes.columnList.toString()
		};

		return {
			...props,
			style: {...props.style, ...style},
		};
	}
);
