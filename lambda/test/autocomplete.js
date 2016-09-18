'use strict';

const assert = require('assert'),
      autocomplete = require('../autocomplete/handler.js'),
      event = require('../autocomplete/event.json');

describe('Autocomplete', function() {
    describe('#main', function() {
        this.timeout(4000);

        it('should return a json object of destinations', function(done) {
            let res = autocomplete.main(event, {}, function(err, res) {
                console.log(
                    JSON.parse(res)
                );

                done();
            });
        });
    });
});
