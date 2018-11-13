'use strict';

const
    fs = require('fs'),
    winston = require('winston'),
    config = require('config/app.js');


const infoConsole = new (winston.transports.Console)({
        name: 'infoConsole',
        prettyPrint: true,
        humanReadableUnhandledException: true,
        level: 'info',
        colorize: true,
        timestamp: function () {
            return new Date();
        }
    }),
    errorConsole = new (winston.transports.Console)({
        name: 'errorConsole',
        prettyPrint: true,
        humanReadableUnhandledException: true,
        level: 'error',
        colorize: true,
        timestamp: function () {
            return new Date();
        }
    }),
    infoFile = new (winston.transports.File)({
        name: 'infoFile',
        filename: `${config.folders.log}/output.log`,
        level: 'info',
        timestamp: function () {
            return new Date();
        },
        json: true,
        prettyPrint: true,
        zippedArchive: true,
        maxsize: 1024 * 1024
    }),
    errorFile = new (winston.transports.File)({
        name: 'errorFile',
        filename: `${config.folders.log}/error.log`,
        level: 'error',
        timestamp: function () {
            return new Date();
        },
        json: true,
        prettyPrint: true,
        zippedArchive: true,
        maxsize: 1024 * 1024
    });

winston.configure({
    transports: [infoConsole, errorConsole, infoFile, errorFile],
    exitOnError: false
});

console.error = function (data) {
    winston.error(data && data.message ? data.message : data, data && data.stack ? data.stack : '');
};

console.log = function (data, namespace) {
    if (!data) {
        return;
    }

    winston.info(namespace ? `${namespace}: ${data}` : data);
};