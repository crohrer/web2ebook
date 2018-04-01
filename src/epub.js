const Epub = require('epub-gen')

function generateEpub({
	title = 'Unknown title',
	author = 'Unknown author',
	publisher = undefined,
	cover = undefined,
	output = undefined,
	lang = 'en',
	content = [],
} = {}){
	const options = {
		title,
		author,
		publisher,
		cover,
		output: output || `output/${title}-${author}-${new Date().toISOString()}`,
		lang,
		content,
	}

	new Epub(options)
}

module.exports = generateEpub
