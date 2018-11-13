'use strict';

const
    fs = require('fs'),
    _ = require('lodash'),
    config = require('config/app.js');

const getAllFlats = () => {
    let fileContent = '';
    try {
        fileContent = fs.readFileSync(config.database.file);
    } catch (e) {
        fileContent = '';
    }

    let flats = [];
    if (fileContent) {
        try {
            flats = JSON.parse(fileContent);
        } catch (e) {
        }
    }

    if (!Array.isArray(flats)) {
        flats = [];
    }

    return flats;
};

const saveFlats = newFlats => {
    let flats = getAllFlats();
    flats = flats.concat(newFlats);
    flats = _.uniq(flats);

    const fileContent = JSON.stringify(flats);
    fs.writeFileSync(config.database.file, fileContent);
};

const getNotSavedFlats = newFlats => {
    let flats = getAllFlats();

    return _.differenceWith(newFlats, flats, _.isEqual)
};


module.exports = {
    saveFlats,
    getNotSavedFlats
};