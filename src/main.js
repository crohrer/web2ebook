const generateEpub = require('./epub')
const generateMobi = require('./mobi')
const buildEbook = require('./buildEbook')
const fs = require('fs')

function start(){
    const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
    const {firstChapterUrl} = config;

    buildSingleEbook({url: firstChapterUrl, config})
}

function buildSingleEbook({url, config}){
    return buildEbook({url, config})
        .then(ebook => generateEpub(ebook))
        .then(epub => generateMobi({input: epub, output: epub.replace(/\.epub$/, '.mobi')}))
        .catch(e => console.error(e));
}

module.exports = start
