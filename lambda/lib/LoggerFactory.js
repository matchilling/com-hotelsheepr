'use strict';

const
    config = require('../config/app.json'),
    Pino = require('pino'),
    Factory = module.exports = {};

/**
 * Logger factory
 *
 * @return {Pino}
 */
Factory.logger = function() {
    const pretty = Pino.pretty();
    pretty.pipe(process.stdout);

    return new Pino(config.logger.options, pretty);
};
