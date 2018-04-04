const Promise = require('bluebird')
const Horseman = require('node-horseman')

function getHtml({url, tryCount = 0}){
    const horseman = new Horseman({ignoreSSLErrors: true})

    return new Promise((resolve, reject) =>{
        if (!url) return reject({message: 'empty URL'})
        console.log(`Retrieving html for ${url}`);

        horseman
            .open(url)
            .html()
            .then(resolve)
            .catch(error =>{
                if(tryCount > 2) {
                    reject({
                        error,
                        message: 'horseman error'
                    });
                    return;
                }
                console.log(`Error getting ${url}\nWill try 2 more times`);
                getHtml({url, tryCount: tryCount + 1}).then(resolve).catch(reject);
            })
            .close()
    })
}

module.exports = getHtml
