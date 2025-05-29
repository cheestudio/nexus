import { useBlockProps, RichText, InnerBlocks } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

export default function Edit({ attributes, setAttributes, clientId }) {
	const { title } = attributes;
	
	const { parentClientId, activeTabIndex } = useSelect(select => {
		const { getBlockParentsByBlockName, getBlockAttributes } = select('core/block-editor');
		const parentClientIds = getBlockParentsByBlockName(clientId, 'chee/tabs');
		const parentClientId = parentClientIds[0];
		
		if (!parentClientId) {
			return { parentClientId: null, activeTabIndex: 0 };
		}
		
		const parentAttributes = getBlockAttributes(parentClientId);
		return { 
			parentClientId,
			activeTabIndex: parentAttributes?.activeTabIndex || 0
		};
	}, [clientId]);
	
	// Get index of this tab item within the parent
	const tabIndex = useSelect(select => {
		if (!parentClientId) return 0;
		const { getBlockOrder } = select('core/block-editor');
		const siblings = getBlockOrder(parentClientId);
		return siblings.indexOf(clientId);
	}, [clientId, parentClientId]);
	
	// This tab is active if index matches activeTabIndex attr
	const isActive = tabIndex === activeTabIndex;

	const blockProps = useBlockProps({
		className: 'chee-tab-item',
		'data-title': title || 'Untitled Tab',
		'data-active': isActive
	});

	return (
		<>
			<div {...blockProps}>
				{!isActive && (
					<div className="chee-tab-item__inactive-notice">
						<p>{__("Tab inactive. Click on the tab above to edit this content.", "chee")}</p>
					</div>
				)}
				<div className="chee-tab-item__header">
					<RichText
						tagName="span"
						className="chee-tab-item__title"
						value={title}
						onChange={(newTitle) => setAttributes({ title: newTitle })}
						placeholder={__("Tab Title", "chee")}
					/>
				</div>
				<div className="chee-tab-item__content">
					<InnerBlocks
						renderAppender={InnerBlocks.ButtonBlockAppender}
					/>
				</div>
			</div>
		</>
	);
} 