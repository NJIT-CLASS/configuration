const redis = require('redis');
const async = require('async');
const fs = require('fs');

const redisOutputLocation = `${__dirname}/language-export.rdb`;
const client = redis.createClient({
    host: 'localhost'/* redis host string */,
    port: 6379/* redis port */,
    /*password: 'dZGVorD42Up/HWDU2n>RsfcZN'/* redis auth string */
});

const redisKeys = JSON.parse(fs.readFileSync(redisOutputLocation));

for (var key in redisKeys) {
    var objValues = [key];
    for(var k in redisKeys[key]) {
        objValues.push(k);
        objValues.push(redisKeys[key][k]);
    }
    client.hset(objValues, ()=>{} );
}
