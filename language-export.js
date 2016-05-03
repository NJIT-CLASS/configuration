const redis = require('redis');
const async = require('async');
const fs = require('fs');

const redisOutputLocation = `${__dirname}/language-export.rdb`;
const client = redis.createClient({
    host: '162.243.45.215'/* redis host string */,
    port: 7658/* redis port */,
    password: 'dZGVorD42Up/HWDU2n>RsfcZN'/* redis auth string */
});

var langKeys = {};

function getValueForKey(key, value, cb) {
    client.hgetall(key, (err, values) => {
        langKeys[key] = values;
        cb();
    });
}

client.keys('lang::*', (err, keys) => {
    async.forEachOf(keys, getValueForKey, (err) => {
        console.log(langKeys);
        fs.writeFileSync(redisOutputLocation, JSON.stringify(langKeys));
    });
});