const getHtml = require('./crawler')
const filterHtml = require('./parser')

function buildEbook({url, config, ebook = {content: []}}){
    const {lang, selectors} = config
    const domain = url.match(/(https?:\/\/[a-z\.A-Z0-9]+)\//)[1]
    return getHtml({url})
        .then(html => filterHtml({html, selectors}))
        .then(results =>{
            let {title, author, publisher, cover, content, chapter, nextLink} = results;

            ebook.lang = lang
            if (title) ebook.title = title;
            if (author && author.length) ebook.author = author;
            if (publisher) ebook.publisher = publisher;
            if (cover) {
                if (!cover.match(/https?:/)) cover = domain + cover
                ebook.cover = cover;
            }
            if (content) ebook.content.push({title: chapter, data: content})

            return {ebook, nextLink}
        })
        .then(result =>{
            let {ebook, nextLink} = result
            if (nextLink && !nextLink.match(/https?:/)) nextLink = domain + nextLink
            if (nextLink) return buildEbook({url: nextLink, config, ebook})
            return ebook
        })
}

module.exports = buildEbook
