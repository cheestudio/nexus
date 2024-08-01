import {useBlockProps} from '@wordpress/block-editor';

export default function Edit() {
	return (
		<div {...useBlockProps()}>
			<button type="button">TOP</button>
		</div>
	);
}
