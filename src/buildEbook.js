const getHtml = require('./crawler')
const filterHtml = require('./parser')

function buildEbook({url, config, ebook = {content:[]}}){
    const {lang, selectors} = config
    return getHtml({url})
        .then(html => filterHtml({html, selectors}))
        .then(results => {
            const {title, author, publisher, cover, content, chapter, nextLink} = results;            

            ebook.lang = lang
            if(title) ebook.title = title;
            if(author && author.length) ebook.author = author;
            if(publisher) ebook.publisher = publisher;
            if(cover) ebook.cover = cover;
            if(content) ebook.content.push({title: chapter, data: content})

            return {ebook, nextLink}
        })
        .then(result => {
            const {ebook, nextLink} = result
            if(nextLink) return buildEbook({url: nextLink, config, ebook})
            return ebook
        })
}

module.exports = buildEbook
