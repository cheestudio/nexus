import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const { tabStyle, backgroundColor, textColor } = attributes;
	const blockProps = useBlockProps.save({
		className: `mac-tabs ${tabStyle}`,
		style: { backgroundColor, color: textColor }
	});

	return (
		<div {...blockProps}>
			<div className="mac-tabs__nav">
				<ul className="mac-tabs__nav-list" role="tablist"></ul>
			</div>
			<div className="mac-tabs__content">
				<InnerBlocks.Content />
			</div>
		</div>
	);
} 