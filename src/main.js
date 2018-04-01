const generateEpub = require('./epub')
const generateMobi = require('./mobi')
const getHtml = require('./crawler')
const filterHtml = require('./parser')
const fs = require('fs')

function start(){
	const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
	const {firstChapterUrl, selectors, lang} = config;

	getHtml({url: firstChapterUrl})
		.then(html => filterHtml({html, selectors}))
		.then(results => {
			const {title, author, publisher, cover, content} = results;
			return generateEpub({
				title,
				author,
				publisher,
				cover,
				content: [{data:content}],
				lang,
			});
		})
		.then(epub => generateMobi({input: epub, output: epub.replace(/\.epub$/,'.mobi')}))
		.catch(e => console.error(e));
}

module.exports = start
