const cheerio = require('cheerio')

function filterHtml({
	html = '',
	selectors = {},
}){
	return new Promise((resolve, reject) => {
		if(html === '') return reject({message: 'Empty HTML'})

		const $ = cheerio.load(html);
		
	})
}

module.exports = filterHtml
