'use strict';

const config = require('../config/app.json'),
    loggerFactory = require('../lib/LoggerFactory'),
    logger = loggerFactory.logger(),
    Q = require('q'),
    unirest = require('unirest');

/**
 * Suggestion
 *
 * @param  {string} searchTerm
 * @param  {String} languageCode
 * @param  {Integer} limit
 * @param  {string} countryCode
 * @return {Promise}
 */
function suggestion(searchTerm, languageCode, limit, countryCode) {
    let deferred = Q.defer(),
        query = {
            search: searchTerm,
            languageCode: languageCode,
            limit: limit,
            countryCode: countryCode
        };

    unirest.get(config.hotelscombined.endpoint.suggestion)
        .query(query)
        .end(function(response) {
            if (response.error) {
                deferred.reject(response);
            }

            deferred.resolve(response.body);
        });

    return deferred.promise;
}

/**
 * Main
 *
 * @param  {Object} event
 * @param  {Object} context
 * @param  {Function} cb
 * @return {Object}
 */
module.exports.main = function(event, context, cb) {
    let error,
        query = event.query,
        countryCode = query.hasOwnProperty('countryCode') ? query.countryCode : 'US',
        languageCode = query.hasOwnProperty('languageCode') ? query.languageCode : 'EN',
        limit = query.hasOwnProperty('limit') ? query.limit : 10,
        searchTerm;

    logger.debug(event);

    if (!query.hasOwnProperty('search')) {
        logger.error(
            error = 'Query has no "search" property defined.'
        );
        return cb(error);
    } else {
        searchTerm = query.search;
    }

    suggestion(searchTerm, languageCode, limit, countryCode)
        .then(function(response) {
            cb(
                null,
                JSON.parse(response)
            );
        })
        .catch(function(err) {
            cb(err);
        })
        .done();
}
