const cheerio = require('cheerio')

function filterHtml({
	html = '',
	selectors = {},
}){
	return new Promise((resolve, reject) => {
		if(html === '') return reject({message: 'Empty HTML'})

		let $ = cheerio.load(html);
		let results = {}
		Object.keys(selectors).map(key => {
			let item = selectors[key];
			let $item = $(item.selector);
			switch(item.type){
				case "html":
					results[key] = $item.html();
					break;
				case "attr":
					results[key] = $item.attr(item.attr);
					break;
				case "text":
				default:
					if(item.isArray) {
						results[key] = [];
						$item.map((i, el) => results[key].push($(el).text()));
					} else {
						results[key] = $item.first().text();
					}
			}
		})
		resolve(results);
	})
}

module.exports = filterHtml
