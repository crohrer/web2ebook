const Promise = require('bluebird')
const puppeteer = require('puppeteer')

function getHtml({url, tryCount = 0}){
    return new Promise((resolve, reject) => {
        if (!url) return reject({ message: 'empty URL' });
        console.log(`Retrieving html for ${url}`);

        (async () => {
            const browser = await puppeteer.launch({ ignoreHTTPSErrors: true, headless: 'new' });
            const page = await browser.newPage();
            try {
                await page.goto(url);
                const html = await page.content();
                resolve(html);
            } catch (error) {
                if (tryCount > 2) {
                    reject({
                        error,
                        message: 'puppeteer error'
                    });
                    return;
                }
                console.log(`Error getting ${url}\nWill try 2 more times`);
                getHtml({ url, tryCount: tryCount + 1 }).then(resolve).catch(reject);
            } finally {
                await browser.close();
            }
        })();
    });
}

module.exports = getHtml;
