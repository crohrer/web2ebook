function getAbsoluteUrl({urlWithDomain, relativeUrl}){
    if (relativeUrl.match(/https?:/)) return relativeUrl;
    const domain = urlWithDomain.match(/(https?:\/\/[a-z\.A-Z0-9]+)\//)[1]
    return domain + relativeUrl
}

module.exports = getAbsoluteUrl
