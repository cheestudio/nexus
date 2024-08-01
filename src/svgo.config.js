module.exports = {
	plugins: [
		{
			name: 'preset-default',
			params: {
				overrides: {
					removeViewBox: false, // viewbox is often essential for proper sizing
					removeTitle: false,	// title might be needed for a11y
					cleanupIds: false,	// manually running this plugin with non-default settings
				}
			}
		},
		{
			name: 'cleanupIds',
			params: {
				// important IDs in the college map are prefixed with these college acronyms
				preservePrefixes: [
					'pins',
					'acc',
					'cca',
					'ccd',
					'cncc',
					'frcc',
					'lcc',
					'mcc',
					'njc',
					'oc',
					'pcc',
					'ppsc',
					'rrcc',
					'tsc'
				]
			}
		}
	]
};
