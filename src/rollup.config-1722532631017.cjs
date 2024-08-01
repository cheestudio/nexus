'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var commonjs = require('@rollup/plugin-commonjs');
var nodeResolve = require('@rollup/plugin-node-resolve');
var terser = require('@rollup/plugin-terser');
var legacy = require('@rollup/plugin-legacy');

// Plugins

// Configs
const configs = {
	name: 'chee_nexus',
	files: ['frontend.js'],
	formats: ['iife'],
	pathIn: 'src/js',
	pathOut: '../dist/js',
	minify: true,
	sourceMap: true
};

const createOutput = ( filename, minify ) => {
	return configs.formats.map( ( format ) => {
		const output = {
			file: `${configs.pathOut}/${filename}${minify ? '.min' : ''}.js`,
			format: format,
			name: configs.name,
			sourcemap: configs.sourceMap
		};

		if ( minify ) {
			output.plugins = [terser()];
		}

		return output
	} )
};

/**
 * Create output formats
 * @param  {String} filename The filename
 * @return {Array}           The outputs array
 */
const createOutputs = ( filename ) => {

	// Create base outputs
	const outputs = createOutput( filename );

	// If not minifying, return outputs
	if ( !configs.minify ) {
		return outputs
	}

	// Otherwise, create second set of outputs
	const outputsMin = createOutput( filename, true );

	// Merge and return the two arrays
	return outputs.concat( outputsMin )

};

/**
 * Create export object
 * @return {Array} The export object
 */
const createExport = () => {
	return configs.files.map( ( file ) => {
		const filename = file.replace( '.js', '' );
		return {
			input: `${configs.pathIn}/${file}`,
			output: createOutputs( filename ),
			plugins: [
				commonjs(),
				nodeResolve(),
				legacy( {'src/js/lib/util.js': 'Util'} )
			]
		}
	} )
};

var rollup_config = createExport();

exports.default = rollup_config;
