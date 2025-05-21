import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const { title } = attributes;
	
	const blockProps = useBlockProps.save({
		className: 'mac-tab-item',
		'data-title': title || '',
	});

	return (
		<div {...blockProps}>
			<div className="mac-tab-item__content">
				<InnerBlocks.Content />
			</div>
		</div>
	);
} 