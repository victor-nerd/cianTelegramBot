'use strict';

const
    config = require('config/app.js'),
    _ = require('lodash'),
    request = require('request');

const getFlatsForPage = page => {
    return new Promise((resolve, reject) => {
        const json = _.cloneDeep(config.cian.searchQuery);
        json.page.value = page;

        const requestOptions = {
            method: 'POST',
            uri: 'https://www.cian.ru/cian-api/site/v1/offers/search/?list_iface=1',
            followRedirect: false,
            headers: {
                'content-type': 'application/json'
            },
            json: json
        };

        request(requestOptions, (error, response, body) => {
            if (error) {
                return reject(error);
            }
            if (response.statusCode != 200) {
                return reject('status code != 200');
            }
            
            const flats = [];
            Object.keys(body.data.offersSerialized).forEach(key => {
                const offer = body.data.offersSerialized[key];
                flats.push(offer.link);
            });

            resolve(flats);
        })
    });
};

const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const getFlats = async () => {
    let flats = [];
    for (let pageNo = 1; pageNo < 3; pageNo++) {
        try {
            flats = flats.concat(await getFlatsForPage(pageNo));
            console.log('succeess request on page ' + pageNo);
        } catch (e) {
            console.error(e);
            break;
        }
        await sleep(5000);
    }

    flats = _.uniq(flats);

    return flats;
};

module.exports = {
    getFlats,
};
