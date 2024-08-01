import {BlockEdit, InspectorControls} from '@wordpress/block-editor';
import {PanelBody, SelectControl} from '@wordpress/components';
import {addFilter} from '@wordpress/hooks';

const {createHigherOrderComponent} = wp.compose;
const applicableBlocks = ['core/list', 'core/button'];

addFilter(
	'blocks.registerBlockType',
	'CHEE_NAMESPACE/icon/add-attribute',
	( settings, name ) => {
		if ( !applicableBlocks.includes( name ) ) {
			return settings;
		}

		return {
			...settings,
			attributes: {
				...settings.attributes,
				icon: {
					type: 'string',
					default: ''
				},
			},
		};
	}
);

addFilter(
	'editor.BlockEdit',
	'CHEE_NAMESPACE/icon/add-control',
	( BlockEdit ) => {
		return ( props ) => {
			const {name, attributes, setAttributes, isSelected} = props;

			if ( !applicableBlocks.includes( name ) || !isSelected ) {
				return <BlockEdit {...props} />;
			}

			const label = name === 'core/list'
				? "Show icon instead of list bullet"
				: "Show icon after button text";

			return <>
				<BlockEdit {...props} />
				<InspectorControls group="styles">
					<PanelBody title="Icon">
						<SelectControl
							label={label}
							value={attributes.icon}
							options={[
								{label: '(none)', value: ''},
								{label: 'External Link', value: '--icon-external-link'},
							]}
							onChange={value => setAttributes( {icon: value} )}
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
	'CHEE_NAMESPACE/icon/render-backend',
	createHigherOrderComponent( ( BlockListBlock ) => {
		return ( props ) => {
			const {name, attributes} = props;

			if ( !applicableBlocks.includes( name ) || !attributes.icon ) {
				return <BlockListBlock {...props}/>;
			}

			return <BlockListBlock
				{...props}
				className={`${props.className} has-icon`}
				wrapperProps={{style: {'--icon': `var(${props.block.attributes.icon})`}}}/>;
		};
	}, 'cheeIcon' )
);

// render on the frontend
addFilter(
	'blocks.getSaveContent.extraProps',
	'CHEE_NAMESPACE/icon/render-frontend',
	( props, blockType, attributes ) => {
		if ( !applicableBlocks.includes( blockType.name ) || !attributes.icon ) {
			return props;
		}

		return {
			...props,
			className: `${props.className || ''} has-icon`.trim(),
			style: {
				...props.style,
				'--icon': `var(${attributes.icon})`
			},
		};
	}
);
