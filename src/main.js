const generateEpub = require('./epub')
const generateMobi = require('./mobi')
const buildEbook = require('./buildEbook')
const fs = require('fs')

function start(){
	const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
	const {firstChapterUrl, selectors, lang} = config;

	buildEbook({url: firstChapterUrl, config})
		.then(ebook => generateEpub(ebook))
		.then(epub => generateMobi({input: epub, output: epub.replace(/\.epub$/,'.mobi')}))
		.catch(e => console.error(e));
}

module.exports = start
