'use strict';

const
    config = require('config/app.js'),
    telegram = require('lib/services/external/telegram'),
    cian = require('lib/services/external/cian'),
    database = require('lib/services/internal/database');

let
    intervalDescriptor = null;

const startJob = () => {
    intervalDescriptor = setInterval(() => intervalHandler(), 1000 * config.cian.pollingIntervalSec);
    intervalHandler();
};

const intervalHandler = async () => {
    console.log('Начало цикла бота');

    let flats = [];
    try {
        flats = await cian.getFlats();
    } catch (e) {
        console.error('Не удалось получить список квартир');
        console.error(e);

        return;
    }

    const newFlats = database.getNotSavedFlats(flats);

    newFlats.forEach(flat => processFlat(flat));

    database.saveFlats(newFlats);

    console.log('Цикл бота пройден, отправлено ' + newFlats.length + ' новых квартир');
};

const processFlat = flat => {
    const msg = formatFlatMessage(flat);

    telegram.sendMessage(msg);
    console.log(msg);
};

const formatFlatMessage = flat => {
  return `Найдена новая квартира! https://www.cian.ru${flat}`;
};

module.exports = {
    startJob
};