const cheerio = require('cheerio')
const getAbsoluteUrl = require('./getAbsoluteUrl')

function filterHtml({
    html = '',
    selectors = {},
    url,
}){
    return new Promise((resolve, reject) =>{
        if (html === '') return reject({message: 'Empty HTML'})

        let $ = cheerio.load(html);
        // rewrite image paths to absolute urls for downloading
        $("img").each(function() {
            let old_src = $(this).attr("src");
            if (!old_src){
                return;
            }
            let new_src = getAbsoluteUrl({urlWithDomain: url, relativeUrl: old_src});
            $(this).attr("src", new_src);
        });
        let results = {};
        Object.keys(selectors).map(key =>{
            let item = selectors[key];
            let $item = $(item.selector);
            switch (item.type) {
                case "html":
                    $item.find(item.ignoreSelector).remove()
                    results[key] = $item.html();
                    break;
                case "attr":
                    if (item.isArray) {
                        results[key] = [];
                        $item.map((i, el) => {
                            const attr = $(el).attr(item.attr);
                            if(attr.trim()){
                                results[key].push(attr)
                            }
                        });
                    } else {
                        results[key] = $item.attr(item.attr);
                    }
                    break;
                case "text":
                default:
                    if (item.isArray) {
                        results[key] = [];
                        $item.map((i, el) => {
                            const text = $(el).text();
                            if(text.trim()){
                                results[key].push(text)
                            }
                        });
                    } else {
                        results[key] = $item.first().text();
                    }
            }
        })
        resolve(results);
    })
}

module.exports = filterHtml
