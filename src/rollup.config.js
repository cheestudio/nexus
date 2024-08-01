// Plugins
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import legacy from '@rollup/plugin-legacy'

// Configs
const configs = {
	name: 'chee_nexus',
	files: ['frontend.js'],
	formats: ['iife'],
	pathIn: './js',
	pathOut: '../dist/js',
	minify: true,
	sourceMap: true
}

const createOutput = ( filename, minify ) => {
	return configs.formats.map( ( format ) => {
		const output = {
			file: `${configs.pathOut}/${filename}${minify ? '.min' : ''}.js`,
			format: format,
			name: configs.name,
			sourcemap: configs.sourceMap
		}

		if ( minify ) {
			output.plugins = [terser()]
		}

		return output
	} )
}

/**
 * Create output formats
 * @param  {String} filename The filename
 * @return {Array}           The outputs array
 */
const createOutputs = ( filename ) => {

	// Create base outputs
	const outputs = createOutput( filename )

	// If not minifying, return outputs
	if ( !configs.minify ) {
		return outputs
	}

	// Otherwise, create second set of outputs
	const outputsMin = createOutput( filename, true )

	// Merge and return the two arrays
	return outputs.concat( outputsMin )

}

/**
 * Create export object
 * @return {Array} The export object
 */
const createExport = () => {
	return configs.files.map( ( file ) => {
		const filename = file.replace( '.js', '' )
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
}

export default createExport()
