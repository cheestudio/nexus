wp.hooks.addFilter(
	'blocks.registerBlockType',
	'CHEE_NAMESPACE/modify-button-text',
	( settings, name ) => {
		if ( name === 'core/button' ) {
			const originalSave = settings.save;
			settings.save = ( props ) => {
				// only filter buttons with placeholders
				if ( !props.attributes.placeholder ) return originalSave( props );

				// get the button text; props.attributes.text is either a string or an object
				const buttonText = typeof props.attributes.text === 'string'
					? props.attributes.text
					: props.attributes.text.originalHTML;

				// when adding link, if there is no text, set the placeholder as the text
				if ( props.attributes.url && !buttonText ) {
					props.attributes.text = props.attributes.placeholder;
				}

				// when removing link, if text matches placeholder, reset the text
				if ( !props.attributes.url && buttonText === props.attributes.placeholder ) {
					props.attributes.text = '';
				}

				return originalSave( props );
			};
		}
		return settings;
	}
);
