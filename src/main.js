const generateEpub = require('./epub')
const getHtml = require('./crawler')
const fs = require('fs')

function start(){
	const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
	const {firstChapterUrl} = config;

	getHtml({url: firstChapterUrl})
		.then(html => console.log(html))
		.catch(e => console.error(e));
}

module.exports = start
