const validate = require("validate.js");
const shortId = require("shortid");
const { async } = require("validate.js");
const Url = require("../models/url");

const port = process.env.SERVICE_PORT
const host = process.env.SERVICE_HOST

const generateUrlKey = () => shortId.generate();
const validateUrl = (url = "") => {
    return validate({ website: url }, {
        website: {
            url: {
                allowLocal: true
            }
        }
    });
}


const encodeURL = async (longURL) => {
    try {
        const urlKey = generateUrlKey();
        const shortUrl = `http://${host}:${port}/${urlKey}`

        await Url.create({
            url: longURL,
            urlId: urlKey
        })
        return apiResponse.success({ url: shortUrl })
    } catch (error) {
        log.red(error)
        return apiResponse.server_error();
    }
};

const decodeURL = async (shortUrlId) => {
    try {
        const url = await Url.findOne({ urlId: shortUrlId });
        log.green(url)
        return !url ? apiResponse.not_found() : apiResponse.success({ url: url.url })
    } catch (error) {
        log.red(error)
        return apiResponse.server_error();
    }
};

const getURLStatistic = async (shortUrlId) => {
    try {
        const urlData = await Url.findOne({ urlId: shortUrlId });
        var stats={};
        if(urlData){
            stats={
                url:urlData.url,
                urlId:urlData.urlId,
                createdAt: urlData.createdAt
            }
        }
        return !stats ? apiResponse.not_found() : apiResponse.success(stats)
    } catch (error) {
        log.red(error)
        return apiResponse.server_error();
    }
};
module.exports = {
    decodeURL,
    encodeURL,
    validateUrl,
    getURLStatistic
};