require('dotenv').config()
const { StatusCodes } = require('http-status-codes');
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const urlService = require("./services/url-service");
const mongodb = require("./config/db");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


global.statusCode = StatusCodes;
global.apiResponse = require('./utils/api-response');
global.log = require('./utils/log');


mongodb.initialize();

app.post("/encode", (req, res) => {
    if (!req.body.url)
        return res.status(statusCode.BAD_REQUEST).send(apiResponse.required_field("URL field required"))

    if (!!urlService.validateUrl(req.body.url))
        return res.status(statusCode.BAD_REQUEST).send(apiResponse.invalid_request("Invalid URL"))

    const longURL = req.body.url;
    urlService.encodeURL(longURL).then((result) => {
        log.green(result)
        return res.status(result.status).send(result)
    }).catch((err) => {
        log.red(err)
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(apiResponse.server_error());
    })
});

app.get("/decode/:shortUrlId", (req, res) => {

    if (!req.params.shortUrlId)
        return res.status(statusCode.BAD_REQUEST).send(apiResponse.required_field("URL ID parameter required"))

    const shortUrlId = req.params.shortUrlId
    urlService.decodeURL(shortUrlId).then((result) => {
        log.green(result)
        return res.status(result.status).send(result)
    }).catch((err) => {
        log.red(err)
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(apiResponse.server_error());
    })
});

app.get("/statistic/:shortUrlId", (req, res) => {

    if (!req.params.shortUrlId)
        return res.status(statusCode.BAD_REQUEST).send(apiResponse.required_field("URL ID parameter required"))

    const shortUrlId = req.params.shortUrlId
    urlService.getURLStatistic(shortUrlId).then((result) => {
        log.green(result)
        return res.status(result.status).send(result)
    }).catch((err) => {
        log.red(err)
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send(apiResponse.server_error());
    })
});


app.listen(process.env.SERVICE_PORT, () => log.green("Indicina URL Shortener Running on Port " + process.env.SERVICE_PORT));