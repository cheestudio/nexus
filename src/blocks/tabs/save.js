import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const { tabStyle, backgroundColor, textColor } = attributes;
	const blockProps = useBlockProps.save({
		className: `chee-tabs ${tabStyle}`,
		style: { backgroundColor, color: textColor }
	});

	return (
		<div {...blockProps}>
			<div className="chee-tabs__nav">
				<ul className="chee-tabs__nav-list" role="tablist"></ul>
			</div>
			<div className="chee-tabs__content">
				<InnerBlocks.Content />
			</div>
		</div>
	);
} 