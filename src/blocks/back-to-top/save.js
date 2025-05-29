import {useBlockProps} from '@wordpress/block-editor';

export default function Save() {
	return (
		<div {...useBlockProps.save()}>
			<button type="button" onClick="window.scrollTo({top: 0, behavior: 'smooth'});">TOP</button>
		</div>
	);
}
