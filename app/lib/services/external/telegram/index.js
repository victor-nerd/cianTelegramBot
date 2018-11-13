'use strict';

const
    config = require('config/app.js'),
    Telegraf = require('telegraf'),
    SocksAgent = require('socks5-https-client/lib/Agent');

let socksAgent = null;
if (config.telegram.socks5Proxy && config.telegram.socks5Proxy.host && config.telegram.socks5Proxy.port) {
    socksAgent = new SocksAgent({
        socksHost: config.telegram.socks5Proxy.host,
        socksPort: config.telegram.socks5Proxy.port,
        socksUsername: config.telegram.socks5Proxy.username || '',
        socksPassword: config.telegram.socks5Proxy.password || ''
    });
}

const bot = new Telegraf(config.telegram.token, {
    telegram: { agent: socksAgent }
});

const sendMessage = msg => {
    bot.telegram.sendMessage(config.telegram.chatId, msg);
};

module.exports = {
    sendMessage
};

