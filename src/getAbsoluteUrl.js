function getAbsoluteUrl({urlWithDomain, relativeUrl}){
    if (relativeUrl.match(/https?:/)) return relativeUrl;
    if (relativeUrl.indexOf('/') === 0) {
        const domain = urlWithDomain.match(/(https?:\/\/[a-z\.A-Z~0-9]+)\//)[1];
        return domain + relativeUrl
    }
    const path = urlWithDomain.match(/(https?:\/\/[a-z\.A-Z~0-9_\/]+\/)([a-z\.A-Z~0-9_])+$/)[1];
    return path + relativeUrl
}

module.exports = getAbsoluteUrl
