'use strict';

const 
    init = require('init.js');

(async () => {
    console.log('Запуск приложения. Ожидайте.');

    try {
        await init();
    } catch (error) {
        console.error(`Ошибка при запуске приложения: ${error.message}.`);
        process.kill(process.pid, 'SIGINT');
    }

    console.log(`Приложение запущено в окружении ${process.env.NODE_ENV}`);
})();