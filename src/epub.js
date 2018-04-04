const Epub = require('epub-gen')

function generateEpub({
    title = 'Unknown title',
    author = 'Unknown author',
    publisher = undefined,
    cover = undefined,
    lang = 'en',
    content = [],
} = {}){
    const output = `output/${title.trim()}-${author}.epub`.replace(/\s+/g, '-').replace('\n', '')
    const options = {
        title,
        author,
        publisher,
        cover,
        lang,
        content,
        output,
        appendChapterTitles: false,
    }

    return new Epub(options).promise.then(() => output);
}

module.exports = generateEpub
