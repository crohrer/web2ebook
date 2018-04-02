const getHtml = require('./crawler')
const filterHtml = require('./parser')
const getAbsoluteUrl = require('./getAbsoluteUrl')

function buildEbook({url, config, ebook = {content: []}}){
    const {lang, selectors} = config
    return getHtml({url})
        .then(html => filterHtml({html, selectors}))
        .then(results =>{
            let {title, author, publisher, cover, content, chapter, nextLink} = results;

            ebook.lang = lang
            if (title) ebook.title = title;
            if (author && author.length) ebook.author = author;
            if (publisher) ebook.publisher = publisher;
            if (cover) {
                ebook.cover = getAbsoluteUrl({urlWithDomain: url, relativeUrl: cover});
            }
            if (content) ebook.content.push({title: chapter, data: content})

            return {ebook, nextLink}
        })
        .then(result =>{
            let {ebook, nextLink} = result
            if (nextLink) {
                return buildEbook({
                    url: getAbsoluteUrl({urlWithDomain: url, relativeUrl: nextLink}),
                    config, ebook
                });
            }
            return ebook
        })
}

module.exports = buildEbook
