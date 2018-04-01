const generateEpub = require('./epub')
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
			generateEpub({
				title,
				author,
				publisher,
				cover,
				content: [{data:content}],
				lang,
			});
			console.log(results)
		})
		.catch(e => console.error(e));
}

module.exports = start
