'use strict';


const Hoek = require('hoek');
const Insync = require('insync');
const Joi = require('joi');
const Wunderground = require('wunderground');
const Venues = require('./venues.json');


const internals = {};


internals.rateLimit = {
    calls: 10,
    period: 60 * 1000
};


module.exports = internals.Mlbweather = function (options) {

    const schema = {
        key: Joi.string().required().description('WUnderground API Key')
    };

    const validation = Joi.validate(options, schema);
    Hoek.assert(!validation.error, `Invalid options ${validation.error && validation.error.annotate()}`);

    const settings = validation.value;

    let tasks = 0
    const throttle = (task) => {

        ++tasks;

        const wait = Math.floor(tasks / internals.rateLimit.calls) * internals.rateLimit.period;
        const wrapper = () => {

            task();
        };

        setTimeout(wrapper, wait);
    };

    const wunderground = Wunderground(settings.key);
    const getWeather = (venue, next) => {

        throttle(() => {

            const query = {
                lat: venue.latitude,
                lng: venue.longitude
            };

            wunderground.hourly(query, (err, result) => {

                return next(err, result);
            });
        });
    };


    this.get = (callback) => {

        Insync.map(Venues, getWeather, (err, results) => {

            if (err) {
                return callback(err);
            }

            for (let i = 0; i < Venues.length; ++i) {
                Venues[i].forecast = results[i].hourly_forecast;
            }

            return callback(null, Venues);
        });
    };
};
