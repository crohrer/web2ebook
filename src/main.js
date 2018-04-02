const generateEpub = require('./epub')
const generateMobi = require('./mobi')
const buildEbook = require('./buildEbook')
const getHtml = require('./crawler')
const filterHtml = require('./parser')
const getAbsoluteUrl = require('./getAbsoluteUrl')
const fs = require('fs')

function start(){
    const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
    const {url, bookLink} = config.bookList;

    getHtml({url})
        .then(html => filterHtml({html, selectors: {bookLink}}))
        .then(results => buildNextEbook({
            urls: results.bookLink.map(link => getAbsoluteUrl({urlWithDomain: url, relativeUrl: link})),
            config
        }))
}

function buildNextEbook({urls, config}){
    const url = urls.pop()
    return buildEbook({url, config})
        .then(ebook => generateEpub(ebook))
        .then(epub => generateMobi({input: epub, output: epub.replace(/\.epub$/, '.mobi')}))
        .catch(e => console.error(e))
        .then(() => {
            if(urls.length) buildNextEbook({urls, config})
        });
}

module.exports = start
