const generateEpub = require('./epub')
const generateMobi = require('./mobi')
const buildEbook = require('./buildEbook')
const getHtml = require('./crawler')
const filterHtml = require('./parser')
const getAbsoluteUrl = require('./getAbsoluteUrl')
const fs = require('fs')

function start(){
    const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

    if(config.textMode){
        return textMode(config);
    }

    return defaultMode(config);
}

function textMode(config){
    if(!config.bookList && config.bookUrl){
        return console.log('book url not implemented yet');
    }

    const {body} = config.selectors;
    getHtml({url})
        .then(html => filterHtml({html, selectors: {body}, url}))
        .then(results => console.log(results))
}

function defaultMode(config){
    if(!config.bookList && config.bookUrl){
        return buildNextEbook({urls: [config.bookUrl], config})
    }

    const {url, bookLink} = config.bookList;
    getHtml({url})
        .then(html => filterHtml({html, selectors: {bookLink}, url}))
        .then(results => buildNextEbook({
            urls: results.bookLink.map(link => getAbsoluteUrl({urlWithDomain: url, relativeUrl: link})),
            config
        }))
}

function buildNextEbook({urls, config}){
    const url = urls.shift()
    return buildEbook({ url, chapterUrls: config.chapterUrls, config, prevUrls: [url]})
        .then(ebook => generateEpub(ebook))
        // disabled mobi support because of Catalina x64 issue https://github.com/hakatashi/kindlegen/issues/7
        //.then(epub => generateMobi({input: epub, output: epub.replace(/\.epub$/, '.mobi')}))
        .catch(e => console.error(e))
        .then(() => {
            if(urls.length) buildNextEbook({urls, config})
        });
}

module.exports = start
