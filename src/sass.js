const sass = require('sass'),
	fs = require('fs'),
	path = require('path');

// Configs
const configs = {
	name: 'pj_nexus',
	files: ['frontend.scss', 'backend.scss'],
	pathIn: './scss',
	pathOut: '../dist/css',
	acfBlocksPath: '../acf-blocks',
	minify: true,
	sourceMap: true,
	compileAcfBlocks: false
};

const getOptions = (minify) => {
	return {
		sourceMap: configs.sourceMap,
		sourceMapIncludeSources: configs.sourceMap,
		style: minify ? 'compressed' : 'expanded',
		importers: [
			{
				findFileUrl(url) {
					if (url.startsWith('~src/')) {
						const filePath = path.resolve('src', url.slice(5));
						return new URL(`file://${path.relative(process.cwd(), filePath)}`);
					}
					return null;
				}
			}
		]
	};
};

const writeFile = (pathOut, fileName, fileData) => {
	fs.mkdir(pathOut, { recursive: true }, (err) => {
		if (err) {
			throw err;
		}

		fs.writeFile(`${pathOut}/${fileName}`, fileData, (err) => {
			if (err) {
				throw err;
			}

			const data = fs.readFileSync(`${pathOut}/${fileName}`);
			const fd = fs.openSync(`${pathOut}/${fileName}`, 'w+');
			fs.writeSync(fd, data, 0, data.length, 0);
			fs.close(fd, (err) => {
				if (err) {
					throw err;
				}
				console.log(`Compiled ${pathOut}/${fileName}`);
			});
		});
	});
};

const parseSass = (file, minify) => {
	const filename = `${file.slice(0, file.length - 5)}${minify ? '.min' : ''}.css`,
		inputFile = `${configs.pathIn}/${file}`,
		options = getOptions(minify),
		result = sass.compile(inputFile, options);

	if (configs.sourceMap) {
		result.sourceMap.sources = result.sourceMap.sources.map(str => str.replace(/(file:\/\/\/([^,]*)\/src\/scss\/)+/g, ''));

		writeFile(configs.pathOut, filename + '.map', JSON.stringify(result.sourceMap));
		result.css += '\n\n/*# sourceMappingURL=' + filename + '.map */';
	}

	writeFile(configs.pathOut, filename, result.css);
};

const getAllScssFiles = (dir) => {
	let results = [];
	const list = fs.readdirSync(dir);
	list.forEach((file) => {
		file = path.resolve(dir, file);
		const stat = fs.statSync(file);
		if (stat && stat.isDirectory()) {
			results = results.concat(getAllScssFiles(file));
		} else if (file.endsWith('.scss')) {
			results.push(file);
		}
	});
	return results;
};

const compileAcfBlocks = () => {
	const scssFiles = getAllScssFiles(configs.acfBlocksPath);
	scssFiles.forEach((file) => {
		const relativePath = path.relative(configs.acfBlocksPath, file);
		const outputFileName = relativePath.replace(/\.scss$/, '.css');
		const outputFilePath = path.join(configs.acfBlocksPath, outputFileName);
		const options = getOptions(configs.minify);
		const result = sass.compile(file, options);

		if (configs.sourceMap) {
			result.sourceMap.sources = result.sourceMap.sources.map(str => str.replace(/(file:\/\/\/([^,]*)\/theme\/acf-blocks\/)+/g, ''));
			writeFile(path.dirname(outputFilePath), path.basename(outputFilePath) + '.map', JSON.stringify(result.sourceMap));
			result.css += '\n\n/*# sourceMappingURL=' + path.basename(outputFilePath) + '.map */';
		}

		writeFile(path.dirname(outputFilePath), path.basename(outputFilePath), result.css);
	});
};


configs.files.forEach((file) => {
	parseSass(file);
	if (configs.minify) {
		parseSass(file, true);
	}
});

if (configs.compileAcfBlocks) {
	compileAcfBlocks();
}