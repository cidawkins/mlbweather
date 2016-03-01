'use strict';


const Code = require('code');
const Lab = require('lab');
const Key = require('../wundergroundkey.json');
const Mlbweather = require('../lib');


const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;


describe('MLB Weather', () => {

    it('gets weather', (done) => {

        const options = {
            key: Key
        };

        const mlbweather = new Mlbweather(options);
        mlbweather.get((err, results) => {

            expect(err).to.not.exist();
            expect(results).to.exist();

            done();
        });
    });
});
