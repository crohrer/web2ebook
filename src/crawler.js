const Promise = require('bluebird')
const Horseman = require('node-horseman')

const horseman = new Horseman({ignoreSSLErrors: true})

function getHtml({
	url = undefined
} = {}){
	return new Promise((resolve, reject) => {
		if(!url) return reject({message: 'empty URL'})
		console.log(`Retrieving html for ${url}`);
		
		horseman
			.open(url)
			.html()
			.then(resolve)
			.catch(error => {
				reject({
					error,
					message: 'horseman error'
				})
			})
			.close();
	})
}

module.exports = getHtml
