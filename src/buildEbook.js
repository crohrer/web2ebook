const getHtml = require('./crawler')
const filterHtml = require('./parser')
const getAbsoluteUrl = require('./getAbsoluteUrl')

function buildEbook({
    url,
    config,
    ebook = {content: []},
    prevUrls = [],
}){
    const {lang, selectors, overrides} = config;
    return getHtml({url})
        .then(html => filterHtml({html, selectors, overrides, url}))
        .then(results =>{
            let {title, author, publisher, cover, content, chapter, nextLink} = results;

            ebook.lang = lang;
            ebook.appendChapterTitles = config.appendChapterTitles;
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
            let {ebook, nextLink} = result;
            const nextUrl = nextLink && getAbsoluteUrl({urlWithDomain: url, relativeUrl: nextLink});
            const ignoreNextLinks = config.ignoreNextLinks || [];
            if (nextLink && prevUrls.indexOf(nextUrl) === -1 && ignoreNextLinks.indexOf(nextUrl) === -1) {
                return buildEbook({
                    url: nextUrl,
                    config,
                    ebook,
                    prevUrls: [...prevUrls, nextUrl]
                });
            }
            return ebook
        })
}

module.exports = buildEbook
