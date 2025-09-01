import { InspectorControls} from '@wordpress/block-editor';
import {PanelBody, ToggleControl} from '@wordpress/components';
import {addFilter} from '@wordpress/hooks';

const applicableBlocks = ['core/group', 'core/columns'];

// Add the new attribute
addFilter(
	'blocks.registerBlockType',
	'Teamer/content-visibility/add-attribute',
	( settings, name ) => {
		if ( !applicableBlocks.includes( name ) ) {
			return settings;
		}

		return {
			...settings,
			attributes: {
				...settings.attributes,
				contentVisibility: {
					type: 'array',
					default: [],
				},
			},
		};
	}
);

// Add the control to the block editor
addFilter(
	'editor.BlockEdit',
	'Teamer/content-visibility/add-control',
	( BlockEdit ) => {
		return ( props ) => {
			const {name, attributes, setAttributes, isSelected} = props;

			if ( !applicableBlocks.includes( name ) || !isSelected ) {
				return <BlockEdit {...props} />;
			}

			const toggleVisibility = (device) => {
				const newVisibility = attributes.contentVisibility.includes(device)
					? attributes.contentVisibility.filter(item => item !== device)
					: [...attributes.contentVisibility, device];
				setAttributes({ contentVisibility: newVisibility });
			};

			return <>
				<BlockEdit {...props} />
        <InspectorControls>
				<PanelBody title="Content Visibility" initialOpen={false}>
					<ToggleControl
						label="Hide on Desktop"
						checked={attributes.contentVisibility.includes('hide-desktop')}
						onChange={() => toggleVisibility('hide-desktop')}
					/>
					<ToggleControl
						label="Hide on Tablet"
						checked={attributes.contentVisibility.includes('hide-tablet')}
						onChange={() => toggleVisibility('hide-tablet')}
					/>
					<ToggleControl
						label="Hide on Mobile"
						checked={attributes.contentVisibility.includes('hide-mobile')}
						onChange={() => toggleVisibility('hide-mobile')}
					/>
				</PanelBody>
			</InspectorControls>
			</>;
		};
	}
);

// Apply the class on the backend
addFilter(
	'editor.BlockListBlock',
	'Teamer/content-visibility/render-backend',
	( BlockListBlock ) => {
		return ( props ) => {
			const {name, attributes} = props;

			if ( !applicableBlocks.includes( name ) || !attributes.contentVisibility.length ) {
				return <BlockListBlock {...props}/>;
			}

			const className = attributes.contentVisibility.join(' ');

			return <BlockListBlock
				{...props}
				className={`${props.className} ${className}`}/>;
		};
	}
);

// Apply the class on the frontend
addFilter(
	'blocks.getSaveContent.extraProps',
	'Teamer/content-visibility/render-frontend',
	( props, blockType, attributes ) => {
		if ( !applicableBlocks.includes( blockType.name ) || !attributes.contentVisibility.length ) {
			return props;
		}

		const className = attributes.contentVisibility.join(' ');

		return {
			...props,
			className: `${props.className} ${className}`,
		};
	}
); 