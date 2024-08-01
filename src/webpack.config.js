// Config for compiling gutenberg blocks from src/blocks/ to theme/blocks
// Uses defaults but attempts to set css-loader's "url" option to "false"
// to prevent it trying to resolve CSS urls, e.g. background: url(...)

const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const getCssRuleIndex = ( rulesObject ) => {
		for ( const key in rulesObject ) {
			if ( rulesObject[key].test && rulesObject[key].test.toString() === '/\\.css$/' ) {
				return key;
			}
		}
		return false;
	},
	getCssLoaderIndex = ( rulesObject ) => {
		for ( const key in rulesObject ) {
			if ( rulesObject[key].loader && rulesObject[key].loader.toString().includes( 'css-loader' ) ) {
				return key;
			}
		}
		return false;
	},
	disableUrlOptionForCssLoader = ( rules ) => {
		let cssRuleIndex = getCssRuleIndex( rules ),
			cssLoaderIndex = false;
		if ( cssRuleIndex )
			cssLoaderIndex = getCssLoaderIndex( rules[cssRuleIndex].use );
		if ( cssLoaderIndex )
			rules[cssRuleIndex].use[cssLoaderIndex].options.url = false;
		return rules;
	}

defaultConfig.module.rules = disableUrlOptionForCssLoader(defaultConfig.module.rules);


module.exports = {
	...defaultConfig,
	plugins: [
    ...defaultConfig.plugins,
    new BrowserSyncPlugin(
      {
        host: 'localhost',
        port: 3000,
        proxy: 'http://startup.local', 
        files: [
          '../**/*.php',
          '../**/*.css',
          '../**/*.js',
          '!node_modules/**/*',
          '!.git/**/*'
        ],
        reloadDelay: 0
      },
      {
        reload: false
      }
    )
  ]
};
