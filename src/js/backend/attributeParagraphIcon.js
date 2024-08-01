import {BlockEdit, InspectorControls} from '@wordpress/block-editor';
import {PanelBody, SelectControl} from '@wordpress/components';
import {addFilter} from '@wordpress/hooks';

const {createHigherOrderComponent} = wp.compose;

addFilter(
	'blocks.registerBlockType',
	'CHEE_NAMESPACE/paragraph-icon/add-attribute',
	( settings, name ) => {
		if ( name === 'core/paragraph' ) {
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
		return settings;
	}
);

addFilter(
	'editor.BlockEdit',
	'CHEE_NAMESPACE/paragraph-icon/add-control',
	( BlockEdit ) => {
		return ( props ) => {
			const {name, attributes, setAttributes, isSelected} = props;
			if ( name !== 'core/paragraph' ) {
				return <BlockEdit {...props} />;
			}
			return (
				<>
					<BlockEdit {...props} />
					{isSelected && (
						<InspectorControls group="styles">
							<PanelBody title="Icon">
								<SelectControl
									label="Show icon before paragraph content"
									value={attributes.icon}
									options={[
										{label: '(none)', value: ''},
										{label: 'Time', value: 'time'},
										{label: 'Address', value: 'address'},
										{label: 'Phone', value: 'phone'},
										{label: 'Email', value: 'email'},
										{label: 'Twitter/X', value: 'x'},
										{label: 'Facebook', value: 'facebook'},
										{label: 'LinkedIn', value: 'linkedin'},
										{label: 'YouTube', value: 'youtube'},
									]}
									onChange={value => setAttributes( {icon: value} )}
								/>
							</PanelBody>
						</InspectorControls>
					)}
				</>
			);
		};
	}
);

// render on the backend
addFilter(
	'editor.BlockListBlock',
	'CHEE_NAMESPACE/paragraph-icon/render-backend',
	createHigherOrderComponent( ( BlockListBlock ) => {
		return ( props ) => {
			const {name, attributes} = props;

			if ( name !== 'core/paragraph' || !attributes.icon ) {
				return <BlockListBlock {...props}/>;
			}

			return <BlockListBlock
				{...props}
				className={`${props.className} has-icon`}
				wrapperProps={{style: {'--icon': `var(--icon-${props.block.attributes.icon})`}}}/>;
		};
	}, 'cheeParagraphIcon' )
);

// render on the frontend
addFilter(
	'blocks.getSaveContent.extraProps',
	'CHEE_NAMESPACE/paragraph-icon/render-frontend',
	( props, blockType, attributes ) => {
		if ( blockType.name !== 'core/paragraph' || !attributes.icon ) {
			return props;
		}

		return {
			...props,
			className: `${props.className || ''} has-icon`.trim(),
			style: {
				...props.style,
				'--icon': `var(--icon-${attributes.icon})`
			},
		};
	}
);
