'use strict';

const
    config = require('config/app.js'),
    pollJob = require('lib/services/internal/pollJob');

process.on('SIGINT', () => {
    console.log(`Сервер приложения (PID: ${process.pid}) остановлен.`);
    process.exit(0);
});

process.on('unhandledRejection', reason => {
    console.error(`[unhandledRejection] - ${reason}.`);
    process.kill(process.pid, 'SIGINT');
});

process.on('uncaughtException', reason => {
    console.error(`[uncaughtException] - ${reason}.`);
    process.kill(process.pid, 'SIGINT');
});

process.on('error', reason => {
    console.error(`[error] - ${reason}.`);
    process.kill(process.pid, 'SIGINT');
});

process.on('MaxListenersExceededWarning', reason => {
    console.error(`[MaxListenersExceededWarning] - ${reason}.`);
    process.kill(process.pid, 'SIGINT');
});

require('lib/logger.js');
require('lib/services/external/telegram');

module.exports = async () => {
    if (!config.telegram.token) {
        console.error('Telegram token is empty');
        process.kill(process.pid, 'SIGINT');
    }

    if (!config.telegram.chatId) {
        console.error('Telegram chatId is empty');
        process.kill(process.pid, 'SIGINT');
    }

    if (!config.cian.searchQuery) {
        console.error('Cian searchQuery is empty');
        process.kill(process.pid, 'SIGINT');
    }

    pollJob.startJob();
};