import { useState, useEffect } from '@wordpress/element';
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';
import { dispatch, select } from '@wordpress/data';
import { PanelBody, RadioControl, Button, ColorPalette, BaseControl, Tooltip } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function Edit({ attributes, setAttributes, clientId }) {
	const { tabStyle, backgroundColor, textColor, activeTabIndex } = attributes;
	const wpData = wp.data.select("core/block-editor");
	const colorPalette = wpData.getSettings().colors;
	const blockProps = useBlockProps({
		className: `chee-tabs ${tabStyle}`,
		style: { backgroundColor, color: textColor }
	});

	const ALLOWED_BLOCKS = ['chee/tab-item'];
	const TEMPLATE = [
		['chee/tab-item', { title: 'Tab 1' }]
	];


	const tabItems = select('core/block-editor').getBlocks(clientId);
	const [tabTitles, setTabTitles] = useState([]);

	// @TODO: Tab titles current inside tab-item block, want to make them directly editable
	useEffect(() => {
		const titles = tabItems.map(block => block.attributes.title || 'Untitled Tab');
		setTabTitles(titles);
	}, [tabItems]);


	const handleTabSelect = (index) => {
		setAttributes({ activeTabIndex: index });
	};

	function insertTabBlock() {
		const innerCount = select("core/editor").getBlocksByClientId(clientId)[0].innerBlocks.length;
		const newTabNumber = innerCount + 1;
		let block = createBlock("chee/tab-item", { title: `Tab ${newTabNumber}` });
		dispatch("core/block-editor").insertBlock(block, innerCount, clientId);
		setAttributes({ activeTabIndex: innerCount });
	}

	function removeTabBlock(index) {
		const { removeBlock } = dispatch('core/block-editor');
		const innerBlocks = select('core/block-editor').getBlocks(clientId);

		// Need the last tab
		if (innerBlocks.length <= 1) {
			return;
		}

		const blockToRemove = innerBlocks[index];
		removeBlock(blockToRemove.clientId);

		if (activeTabIndex >= innerBlocks.length - 1) {
			setAttributes({ activeTabIndex: Math.max(0, innerBlocks.length - 2) });
		} else if (activeTabIndex === index) {
			setAttributes({ activeTabIndex: Math.max(0, activeTabIndex - 1) });
		} else if (activeTabIndex > index) {
			setAttributes({ activeTabIndex: activeTabIndex - 1 });
		}
	}

	return (
		<div {...blockProps}>
			<InspectorControls>
				<PanelBody title="Tab Settings">
					<RadioControl
						label="Tab Style"
						selected={tabStyle}
						options={[
							{ label: 'Normal', value: 'normal' },
							{ label: 'Pills', value: 'is-style-pills' },
							{ label: 'Underline', value: 'is-style-underline' },
						]}
						onChange={(newStyle) => setAttributes({ tabStyle: newStyle })}
					/>
				</PanelBody>
				<PanelBody title={__("Color Settings", "chee")} initialOpen={false}>
					<BaseControl>
						<div className="color-picker-container">
							<BaseControl.VisualLabel>{__("Background Color", "chee")}</BaseControl.VisualLabel>
							<ColorPalette
								colors={colorPalette}
								disableCustomColors={true}
								value={backgroundColor}
								onChange={(color) => setAttributes({ backgroundColor: color })}
							/>
						</div>
					</BaseControl>
					<BaseControl>
						<div className="color-picker-container">
							<BaseControl.VisualLabel>{__("Text Color", "chee")}</BaseControl.VisualLabel>
							<ColorPalette
								colors={colorPalette}
								disableCustomColors={true}
								value={textColor}
								onChange={(color) => setAttributes({ textColor: color })}
							/>
						</div>
					</BaseControl>
				</PanelBody>
			</InspectorControls>

			{/* Tab Navigation */}
			{tabTitles.length > 0 && (
				<div className="chee-tabs__nav">
					<ul className="chee-tabs__nav-list" role="tablist">
						{tabTitles.map((title, index) => (
							<li
								key={index}
								className={`chee-tabs__nav-item ${index === activeTabIndex ? 'active' : ''}`}
								role="presentation"
							>
								<div className="chee-tabs__nav-wrapper">
									<button
										className="chee-tabs__nav-button"
										role="tab"
										aria-selected={index === activeTabIndex}
										aria-controls={`chee-tab-${clientId}-${index}`}
										tabIndex={index === activeTabIndex ? 0 : -1}
										onClick={() => handleTabSelect(index)}
									>
										{title}
									</button>
									{tabTitles.length > 1 && (
										<Tooltip text={__("Remove tab", "chee")}>
											<button
												className="chee-tabs__remove-button"
												onClick={() => removeTabBlock(index)}
												aria-label={__("Remove tab", "chee")}
											>
												×
											</button>
										</Tooltip>
									)}
								</div>
							</li>
						))}
						<li className="chee-tabs__nav-item chee-tabs__add-button">
							<Button
								variant="secondary"
								onClick={insertTabBlock}
								icon="plus"
								aria-label={__("Add new tab", "chee")}
							/>
						</li>
					</ul>
				</div>
			)}

			<div className="chee-tabs__content">
				<InnerBlocks
					allowedBlocks={ALLOWED_BLOCKS}
					template={TEMPLATE}
					renderAppender={false}
				/>
			</div>
		</div>
	);
} 