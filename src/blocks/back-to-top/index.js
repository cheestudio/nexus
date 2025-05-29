import {registerBlockType} from '@wordpress/blocks';
import {blockIcon} from '../../js/lib/blockIcon';
import metadata from './block.json';
import Edit from './edit';
import Save from './save';
import './style.scss';

registerBlockType( metadata.name, {
	icon: {
		src: blockIcon.src,
	},
	edit: Edit,
	save: Save,
} );
