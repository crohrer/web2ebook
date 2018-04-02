const Promise = require('bluebird')
const Horseman = require('node-horseman')

function getHtml({url, secondTry = false}){
    const horseman = new Horseman({ignoreSSLErrors: true})

    return new Promise((resolve, reject) =>{
        if (!url) return reject({message: 'empty URL'})
        console.log(`Retrieving html for ${url}`);

        horseman
            .open(url)
            .html()
            .then(resolve)
            .catch(error =>{
                if(secondTry) {
                    return reject({
                        error,
                        message: 'horseman error'
                    })
                }
                console.log(`Error getting ${url}\nWill try 1 more time`)
                getHtml({url, secondTry: true}).then(resolve);
            })
            .close();
    })
}

module.exports = getHtml
